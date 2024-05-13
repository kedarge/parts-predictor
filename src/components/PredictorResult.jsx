import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Fragment } from "react";

const PredictorResult = ({ retuls }) => {
  return (
    <Fragment>
      {retuls.status === "S" ? (
        <Fragment>
          <TableContainer>
            <Table variant="simple" border={1} size="sm">
              <Thead>
                <Tr bg="gray.100">
                  <Th>&nbsp;</Th>
                  <Th>ADDITIONAL_TECH_NEEDED</Th>
                  <Th>ADDITIONAL_TIME_NEEDED</Th>
                  <Th>ITEM_DESCRIPTION</Th>
                  <Th>ITEM_ID</Th>
                  <Th>NOTES</Th>
                  <Th isNumeric>QUANTITY</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(retuls.items).map((item) => (
                  <Tr key={`tech-${item}`}>
                    <Td>{Number(item) + 1}</Td>
                    <Td>{retuls.items[item]?.ADDITIONAL_TECH_NEEDED || "-"}</Td>
                    <Td>{retuls.items[item]?.ADDITIONAL_TIME_NEEDED || "-"}</Td>
                    <Td>{retuls.items[item]?.ITEM_DESCRIPTION || "-"}</Td>
                    <Td>{retuls.items[item]?.ITEM_ID || "-"}</Td>
                    <Td>{retuls.items[item]?.NOTES || "-"}</Td>
                    <Td isNumeric>{retuls.items[item]?.QUANTITY || "-"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <Fragment> {retuls.NO_RECOMMENDATION_REASON} </Fragment>
      )}
    </Fragment>
  );
};
export default PredictorResult;
