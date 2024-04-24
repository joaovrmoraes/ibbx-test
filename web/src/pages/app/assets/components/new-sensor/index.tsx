import * as Dialog from "@radix-ui/react-dialog";
import {
  Content,
  Overlay,
  Title,
} from "../../../../../components/dialog-parts/style";
import { Form } from "../../../../../components/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../../../components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSensor } from "../../../../../api/create-sensor";
import { getSensorsResponse } from "../../../../../api/get-sensors";

interface NewSensorProps {
  assetName: string;
  assetId: string;
}

const sensorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome deve ter pelo menos 1 caractere" }),
});

type Sensors = z.infer<typeof sensorSchema>;

export function NewSensor({ assetId }: NewSensorProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Sensors>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(sensorSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: registerSensor } = useMutation({
    mutationKey: ["createSensor"],
    mutationFn: async (data: Sensors) => {
      return await createSensor({ name: data.name, assetId });
    },
    onSuccess(data) {
      queryClient.setQueryData(
        ["sensors", assetId],
        (old: getSensorsResponse[]) => {
          return [...(old ?? []), data];
        }
      );
    },
  });

  const OnSubmit = (data: Sensors) => {
    registerSensor(data);
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Novo Sensor</Title>

        <Form onSubmit={handleSubmit(OnSubmit)}>
          <label>Nome:</label>
          {errors.name && <span>{errors.name.message}</span>}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input data-error={!!errors.name} {...field} autoFocus />
            )}
          />
          <Button type="submit" disabled={!!errors.name}>
            Criar
          </Button>
        </Form>
      </Content>
    </Dialog.Portal>
  );
}
