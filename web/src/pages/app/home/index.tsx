import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/button";
import { NewAsset } from "./components/new-asset";
import { Container, Header } from "./style";
import { getAssets } from "../../../api/get-assets";
import { useNavigate } from "react-router-dom";
import { ListContainer } from "../../../components/list-container";
import { Title } from "../../../components/title";

import * as Dialog from "@radix-ui/react-dialog";

export function Home() {
  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const result = await getAssets();

      if (result.length === 0) {
        throw new Error("Empty array");
      }

      return result;
    },
    retry: 3,
    retryOnMount: true,
  });

  const navigate = useNavigate();

  const handleNavigateAsset = (name: string, id: string) => {
    navigate(`/asset/${name}/${id}`);
  };

  return (
    <Container>
      <Header>
        <Title>Ativos Cadastrados</Title>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Add. Ativos</Button>
          </Dialog.Trigger>
          <NewAsset />
        </Dialog.Root>
      </Header>

      <ListContainer>
        <ul>
          {assets?.map((asset) => (
            <li
              key={asset.id}
              onClick={() => {
                handleNavigateAsset(asset.name, asset.id);
              }}
            >
              {asset.name}
            </li>
          ))}
        </ul>
      </ListContainer>
    </Container>
  );
}
