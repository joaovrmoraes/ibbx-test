import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAsset } from "../../../../../api/create-asset";
import { getAssetsResponse } from "../../../../../api/get-assets";
import { useNavigate } from "react-router-dom";
import {
  Content,
  Overlay,
  Title,
} from "../../../../../components/dialog-parts/style";
import { Form } from "../../../../../components/form";

import * as Dialog from "@radix-ui/react-dialog";

const assetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome deve ter pelo menos 1 caractere" }),
});

type Asset = z.infer<typeof assetSchema>;

export function NewAsset() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Asset>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(assetSchema),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: registerAsset } = useMutation({
    mutationKey: ["createAsset"],
    mutationFn: async (data: Asset) => {
      return await createAsset(data);
    },
    onSuccess(data) {
      queryClient.setQueryData(["assets"], (old: getAssetsResponse[]) => {
        return [...old, data];
      });

      navigate(`/asset/${data.name}/${data.id}`);
    },
  });

  const onSubmit = (data: Asset) => {
    registerAsset(data);
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Novo Ativo</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            Salvar
          </Button>
        </Form>
      </Content>
    </Dialog.Portal>
  );
}
