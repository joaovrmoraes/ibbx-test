import { z } from "zod";
import { Button } from "../../../../../components/button";
import { Content, Overlay } from "../../../../../components/dialog-parts/style";
import { Form } from "../../../../../components/form";

import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateCollectResponse,
  createCollect,
} from "../../../../../api/create-collects";

interface NewDataProps {
  assetId: string;
  sensorId: string;
}

const sensorSchema = z.object({
  date: z.string().min(1, { message: "A data não pode estar vazia" }),
  value: z.coerce.number().min(0, "O valor deve ser maior que 0"),
});

type Data = z.infer<typeof sensorSchema>;

export function NewData({ assetId, sensorId }: NewDataProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      date: "",
      value: 0,
    },
    resolver: zodResolver(sensorSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: registerCollect } = useMutation({
    mutationKey: ["createData"],
    mutationFn: async (data: Data) => {
      return await createCollect({
        assetId,
        sensorId,
        date: new Date(data.date),
        value: data.value,
      });
    },
    onSuccess(data) {
      queryClient.setQueryData(
        ["collects", assetId, sensorId],
        (old: CreateCollectResponse[]) => {
          return [...(old ?? []), data];
        }
      );
    },
    retry: 3,
  });

  const onSubmit = (data: Data) => {
    registerCollect(data);
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errors.date && <span>{errors.date.message}</span>}
          <label>Data: </label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => <input {...field} type="date" />}
          />

          {errors.value && <span>{errors.value.message}</span>}
          <label>Valor: </label>
          <Controller
            control={control}
            name="value"
            render={({ field }) => <input {...field} type="number" />}
          />

          <Button type="submit" disabled={!!errors.date || !!errors.value}>
            Adicionar
          </Button>
        </Form>
      </Content>
    </Dialog.Portal>
  );
}
