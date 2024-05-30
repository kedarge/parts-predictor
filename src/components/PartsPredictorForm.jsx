import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { SVGComponent } from "./";

import { InfoIcon } from "@chakra-ui/icons";
import { getToday /*, fakeResponse */ } from "../utills/utills";
import { DynamicForm, PredictorResult } from "./";

const product_lines = process.env?.REACT_APP_PRODUCT_LINES?.split(",") || [
  "dishwashers,dryers",
];

const paramNames = process.env?.REACT_APP_DYNAMIC_PARAMS?.split(",") || [
  "param1",
  "param2",
  "param3",
];

const PartsPredictorForm = () => {
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [createDate, setCreateDate] = useState(getToday());
  const [serialNum, setSerialNum] = useState("");
  const [prdLn, setPrdLn] = useState("dishwashers");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const isFormNotEmpty = () => {
    return Boolean(
      sku ||
        description ||
        remarks ||
        createDate ||
        serialNum ||
        Object.values(formData).some(Boolean)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const queryParams = new URLSearchParams({
      sku: encodeURIComponent(sku), // Encode each parameter value
      description: encodeURIComponent(description),
      remarks: encodeURIComponent(remarks),
      create_date: encodeURIComponent(createDate),
      serial_num: encodeURIComponent(serialNum),
      prd_ln: encodeURIComponent(prdLn),
      ...Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          encodeURIComponent(value),
        ])
      ),
    }); // Create URLSearchParams object

    console.log(
      "queryParams :::",
      `${process.env.REACT_APP_API_ORIGIN}/predict/?${queryParams}`
    );

    try {
      setIsLoading(true);
      await axios
        .get(`${process.env.REACT_APP_API_ORIGIN}/predict/?${queryParams}`)
        .then((res) => {
          console.log("response", res.data);
          setIsLoading(false);
          setResult(res.data);
          toast({
            title: "API Response received.",
            description:
              res.data?.status === "S"
                ? "Showing results!"
                : "Someting went wrong!",
            status: res.data?.status === "S" ? "success" : "error",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: `${error?.code} - ${error?.name}`,
            description: error?.message
              ? `${error?.message} - Someting went wrong!`
              : "Someting went wrong!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
      console.log("Data posted successfully!");

      /** Fake data start */
      // const response = fakeResponse(sku);
      // setResult(response);
      // setTimeout(() => {
      //   setIsLoading(false);
      //   console.log("Data posted successfully!");
      // }, 500);
      /** Fake data end */
    } catch (error) {
      console.error("Error submitting the data:", error);
    }
  };

  const clearForm = () => {
    setResult("");
  };

  const clearAll = () => {
    setSku("");
    setDescription("");
    setRemarks("");
    setCreateDate(getToday());
    setSerialNum("");
    setPrdLn("");
    setFormData({});
  };

  return (
    <Fragment>
      <GridItem px="2" area={"nav"}>
        <Box
          as="form"
          onSubmit={handleSubmit}
          maxW="lg"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="100%"
          my="6"
        >
          <Box p="6">
            <FormControl>
              <FormLabel htmlFor="sku">SKU</FormLabel>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Full SKU model number"
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Problem description"
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="remarks">Remarks</FormLabel>
              <Input
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Input from agent (Optional)"
              />
            </FormControl>
            {
              <FormControl mt={4}>
                <FormLabel htmlFor="create_date">
                  <Text mr="2" as="span">
                    Intended Prediction Date
                  </Text>
                  <Tooltip
                    ml="4"
                    label="Enter date to reference connected data for this appliance. Prediction will not consider connected data after this date. (YYYY-MM-DD)"
                  >
                    <InfoIcon color="red.600" />
                  </Tooltip>
                </FormLabel>
                <Input
                  id="create_date"
                  value={createDate}
                  type="date"
                  onChange={(e) => setCreateDate(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  isRequired
                />
              </FormControl>
            }
            <FormControl mt={4}>
              <FormLabel htmlFor="serial_num">Serial Number</FormLabel>
              <Input
                id="serial_num"
                value={serialNum}
                onChange={(e) => setSerialNum(e.target.value)}
                placeholder="Serial number of the model"
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="prd_ln">Product Line</FormLabel>
              <Select
                id="prd_ln"
                value={prdLn}
                onChange={(e) => setPrdLn(e.target.value)}
                required
              >
                {product_lines.map((opt) => (
                  <option key={`options-${opt}`} value={opt}>
                    {opt.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>

            <DynamicForm
              paramNames={paramNames}
              formData={formData}
              setFormData={setFormData}
            />

            <ButtonGroup variant="outline" spacing="6" mt="4" ml="-3">
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Submitting"
                disabled={isLoading}
                bg="green.100"
              >
                Submit
              </Button>
              {isFormNotEmpty() && !isLoading && (
                <Button type="button" onClick={clearAll} bg="red.100">
                  Clear All
                </Button>
              )}
              {result && !isLoading && (
                <Button type="button" onClick={clearForm} bg="red.100">
                  Clear Results
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </Box>
      </GridItem>
      <GridItem pl="2" area={"main"}>
        {isLoading ? (
          <Box>
            <Flex>
              <Center w="100%" h="100vh">
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                />
              </Center>
            </Flex>
          </Box>
        ) : (
          <Fragment>
            {result ? (
              <Fragment>
                <PredictorResult retuls={result} />
              </Fragment>
            ) : (
              <Box>
                <Flex>
                  <Center w="100%" h="100vh">
                    <SVGComponent.ElectronicComponents />
                    <Text color="green.300">
                      Please enter valid information for parts prediction then
                      click the submit button.
                    </Text>
                  </Center>
                </Flex>
              </Box>
            )}
          </Fragment>
        )}
      </GridItem>
    </Fragment>
  );
};

export default PartsPredictorForm;
