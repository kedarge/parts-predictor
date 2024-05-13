import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Center,
  SimpleGrid,
  Flex,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Fragment } from "react";

const PredictorResult = ({ retuls }) => {
  return (
    <Fragment>
      {retuls.status === "S" ? (
        <Fragment>
          <SimpleGrid columns={1} spacing={10}>
            <Box p="6">
              <TableContainer>
                <Table variant="simple" border={1} size="sm">
                  <Thead>
                    <Tr bg="gray.100">
                      <Th>&nbsp;</Th>
                      <Th>ITEM_ID</Th>
                      <Th>ITEM_DESCRIPTION</Th>
                      <Th isNumeric>QUANTITY</Th>
                      <Th>NOTES</Th>
                      <Th>ADDITIONAL_TECH_NEEDED</Th>
                      <Th>ADDITIONAL_TIME_NEEDED</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(retuls.items).map((item) => (
                      <Tr key={`tech-${item}`}>
                        <Td>{Number(item) + 1}</Td>
                        <Td>{retuls.items[item]?.ITEM_ID || "-"}</Td>
                        <Td>{retuls.items[item]?.ITEM_DESCRIPTION || "-"}</Td>
                        <Td isNumeric>{retuls.items[item]?.QUANTITY || "-"}</Td>
                        <Td>{retuls.items[item]?.NOTES || "-"}</Td>
                        <Td>
                          {retuls.items[item]?.ADDITIONAL_TECH_NEEDED || "-"}
                        </Td>
                        <Td>
                          {retuls.items[item]?.ADDITIONAL_TIME_NEEDED || "-"}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </SimpleGrid>
        </Fragment>
      ) : (
        <Fragment>
          {" "}
          <Box>
            <Flex>
              <Center w="100%" h="100vh">
              <InfoIcon color="orange.400" /> <Text color="orange.400" ml="2">{retuls.NO_RECOMMENDATION_REASON}</Text>
              </Center>
            </Flex>
          </Box>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};
export default PredictorResult;
