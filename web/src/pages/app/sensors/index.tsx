import { useParams } from "react-router-dom";
import {
  Container,
  GraphAndListContainer,
  GraphContainer,
  Header,
  Table,
  TableContainer,
} from "./styles";
import { Title } from "@/components/title";
import { Button } from "@/components/button";
import { NewData } from "./components/new-data";
import { useQuery } from "@tanstack/react-query";
import { getCollects } from "@/api/get-collects";
import ReactECharts from "echarts-for-react";

import * as Dialog from "@radix-ui/react-dialog";


export function Sensors() {
  const { assetId, sensorName, sensorId } = useParams();

  const { data: collects } = useQuery({
    queryKey: ["collects", assetId, sensorId],
    queryFn: async () => {
      if (!assetId || !sensorId) return Promise.resolve([]);

      const result = await getCollects({ assetId, sensorId });

      if (result.length === 0) {
        throw new Error("Empty array");
      }

      return result;
    },
    retry: 3,
    retryOnMount: true,
  });

  const dataByDate: Record<string, number> = {};

  collects?.forEach((collect) => {
    dataByDate[collect.date] = (dataByDate[collect.date] || 0) + collect.value;
  });

  const dates = Object.keys(dataByDate);
  const values = Object.values(dataByDate);

  const option = {
    xAxis: {
      type: "category",
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: values,
        type: "line",
      },
    ],
  };

  return (
    <Container>
      <Header>
        <Title>Sensor: {sensorName?.toLocaleUpperCase()}</Title>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Add. Dados</Button>
          </Dialog.Trigger>
          {assetId && sensorId && (
            <NewData assetId={assetId} sensorId={sensorId} />
          )}
        </Dialog.Root>
      </Header>
      <GraphAndListContainer>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {collects?.map((collect) => (
                <tr key={collect.id}>
                  <td>{collect.date}</td>
                  <td>{collect.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <GraphContainer>
          <ReactECharts
            option={option}
            style={{ width: "100%", height: "100%" }}
          />
        </GraphContainer>
      </GraphAndListContainer>
    </Container>
  );
}
