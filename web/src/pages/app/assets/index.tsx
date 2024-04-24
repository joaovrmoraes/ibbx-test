import { useParams, useNavigate } from "react-router-dom";
import { Container, Header } from "./style";
import { Button } from "../../../components/button";
import { ListContainer } from "../../../components/list-container";
import { useQuery } from "@tanstack/react-query";
import { getSensors } from "../../../api/get-sensors";
import { NewSensor } from "./components/new-sensor";
import { Title } from "../../../components/title";

import * as Dialog from "@radix-ui/react-dialog";

export function Asset() {
  const { assetName, assetId } = useParams();
  const navigate = useNavigate();

  const { data: sensors } = useQuery({
    queryKey: ["sensors", assetId],
    queryFn: async () => {
      if (!assetId) return Promise.resolve([]);

      const result = await getSensors({ assetId });

      if (result.length === 0) {
        throw new Error("Empty array");
      }

      return result;
    },
    retry: 3,
    retryOnMount: true,
  });

  const handleNavigateSensor = ({
    sensorName,
    sensorId,
  }: {
    sensorName: string;
    sensorId: string;
  }) => {
    navigate(`/${assetName}/${assetId}/sensors/${sensorName}/${sensorId}`);
  };

  return (
    <Container>
      <Header>
        <Title>Sensor: {assetName?.toUpperCase()}</Title>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button disabled={!assetId || !assetName}>Add. Sensor</Button>
          </Dialog.Trigger>
          {assetId && assetName && (
            <NewSensor assetId={assetId} assetName={assetName} />
          )}
        </Dialog.Root>
      </Header>

      <ListContainer>
        <ul>
          {sensors?.map((sensor) => (
            <li
              key={sensor.id}
              onClick={() => {
                handleNavigateSensor({
                  sensorName: sensor.name,
                  sensorId: sensor.id,
                });
              }}
            >
              {sensor.name}
            </li>
          ))}
        </ul>
      </ListContainer>
    </Container>
  );
}
