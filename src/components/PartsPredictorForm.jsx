import { InfoIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  // AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
// import stringApi from "js_str_utils";
import React, { Fragment, useState } from "react";
import { getToday /*, fakeResponse */ } from "../utills/utills";
import { DynamicForm, PredictorResult, SVGComponent } from "./";

const product_lines = process.env?.REACT_APP_PRODUCT_LINES?.split(",") || [
  "dishwashers,dryers",
];

const paramNames = process.env?.REACT_APP_DYNAMIC_PARAMS?.split(",") || [];

const PartsPredictorForm = () => {
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  // const [remarks, setRemarks] = useState("");
  const [createDate, setCreateDate] = useState(getToday());
  const [serialNum, setSerialNum] = useState("");
  const [prdLn, setPrdLn] = useState("dishwashers");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const isFormNotEmpty = () => {
    return Boolean(
      sku ||
        description ||
        // remarks ||
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
      // remarks: encodeURIComponent(remarks),
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

    try {
      setIsLoading(true);
      await axios
        .get(`${process.env.REACT_APP_API_ORIGIN}/predict/?${queryParams}`, {
          headers: {
            "api_key": "cfa9c09818b5448b8c39177b1e583dcc99", // Replace with your actual API key
            "api-key": "cfa9c09818b5448b8c39177b1e583dcc99",
          },
        })
        .then((res) => {
          setIsLoading(false);
          setResult(res.data);
          toast({
            title: "API Response received.",
            description:
              res.data?.status === "S"
                ? "Showing results!"
                : "Someting went wrong!",
            status: res.data?.status === "S" ? "success" : "warning",
            duration: 5000,
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
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        });

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
    // setRemarks("");
    setCreateDate(getToday());
    setSerialNum("");
    setPrdLn("");
    setFormData({});
  };

  const containerHeight = "calc(100vh - 117px)";

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
          height={containerHeight}
          overflowY="auto"
          my="6"
          m={[0, 0]}
        >
          <Box p="6">
            <FormControl>
              <FormLabel htmlFor="sku">
                SKU
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Full SKU model number"
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">
                Description
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Problem description"
                isRequired
              />
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel htmlFor="remarks">Remarks</FormLabel>
              <Input
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Input from agent (Optional)"
              />
            </FormControl> */}
            {
              <FormControl mt={4}>
                <FormLabel htmlFor="create_date">
                  <Text mr="2" as="span">
                    Intended Prediction Date
                    <Text as="span" color="red">
                      *
                    </Text>
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
              <FormLabel htmlFor="serial_num">
                Serial Number
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
              <Input
                id="serial_num"
                value={serialNum}
                onChange={(e) => setSerialNum(e.target.value)}
                placeholder="Serial number of the model"
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="prd_ln">
                Product Line
                <Text as="span" color="red">
                  *
                </Text>
              </FormLabel>
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

            {paramNames[0]?.trim() !== "" && (
              <DynamicForm
                paramNames={paramNames}
                formData={formData}
                setFormData={setFormData}
              />
            )}
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
                <Button type="button" onClick={onOpen} bg="red.100">
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
          <Box height={containerHeight}>
            <Flex>
              <Center w="100%" h={containerHeight}>
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
              <Box height={containerHeight}>
                <Center w="100%" h={containerHeight}>
                  <Text align="center">
                    <div style={{ marginLeft: "10%" }}>
                      <SVGComponent.ElectronicComponents />
                    </div>
                    <Text bg="blue.900" p="3" color="white">
                      Please enter valid information for parts prediction <br />
                      then click the submit button.
                    </Text>
                  </Text>
                </Center>
              </Box>
            )}
          </Fragment>
        )}
      </GridItem>
      <Fragment>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Clear All!
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This action will clear all results and form data.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    clearForm();
                    clearAll();
                    onClose();
                  }}
                  ml={3}
                >
                  Clear All
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Fragment>
    </Fragment>
  );
};

export default PartsPredictorForm;
