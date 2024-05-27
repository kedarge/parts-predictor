import { Fragment, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Center,
  // Container,
  Grid,
  GridItem,
  // SimpleGrid,
  Flex,
  Tooltip,
  Text,
  ButtonGroup,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { PredictorResult, DynamicForm } from "./";

import axios from "axios";

import { InfoIcon } from "@chakra-ui/icons";
import { SVGComponent } from "./";

const product_lines = process.env?.REACT_APP_PRODUCT_LINES?.split(",") || [
  "dishwashers,dryers",
];

const paramNames = process.env?.REACT_APP_DYNAMIC_PARAMS?.split(",") || [
  "param1",
  "param2",
  "param3",
];

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${year}-${month}-${day}`;
};

const PartsPredictorForm = () => {
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [createDate, setCreateDate] = useState(getToday());
  const [serialNum, setSerialNum] = useState("");
  const [prdLn, setPrdLn] = useState("dishwashers");
  const [formData, setFormData] = useState({});
  // const [param1, setParam1] = useState("");
  // const [param2, setParam2] = useState("");
  // const [param3, setParam3] = useState("");
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
      // param1 ||
      // param2 ||
      // param3
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
      // param1: encodeURIComponent(param1), // Placeholder
      // param2: encodeURIComponent(param2), // Placeholder
      // param3: encodeURIComponent(param3), // Placeholder
    }); // Create URLSearchParams object

    console.log(
      "queryParams :::",
      `${process.env.REACT_APP_API_ORIGIN}/predict/?${queryParams}`
    );

    try {
      setIsLoading(true);
      // await axios
      //   .get(`${process.env.REACT_APP_API_ORIGIN}/predict/?${queryParams}`)
      //   .then((res) => {
      //     console.log("response", res.data);
      //     setIsLoading(false);
      //     setResult(res.data);
      //     toast({
      //       title: "API Response received.",
      //       description:
      //         res.data?.status === "S"
      //           ? "Showing results!"
      //           : "Someting went wrong!",
      //       status: res.data?.status === "S" ? "success" : "error",
      //       duration: 9000,
      //       isClosable: true,
      //     });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     toast({
      //       title: `${error?.code} - ${error?.name}`,
      //       description: error?.message
      //         ? `${error?.message} - Someting went wrong!`
      //         : "Someting went wrong!",
      //       status: "error",
      //       duration: 9000,
      //       isClosable: true,
      //     });
      //   });
      // console.log("Data posted successfully!");

      const response =
        sku === "CDT845P2N8S1"
          ? {
              items: {
                0: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "WASH PUMP MAIN ASM",
                  ITEM_ID: "WD19X32518",
                  NOTES: "",
                  QUANTITY: 1,
                },
                1: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "LOWER SPRAY ARM ASM",
                  ITEM_ID: "WD22X25281",
                  NOTES: "",
                  QUANTITY: 1,
                },
                2: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "DOOR VENT SEAL",
                  ITEM_ID: "WD08X10092",
                  NOTES: "",
                  QUANTITY: 1,
                },
                3: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "GASKET TUB PLASTIC",
                  ITEM_ID: "WD08X22095",
                  NOTES: "",
                  QUANTITY: 1,
                },
                4: {
                  ADDITIONAL_TECH_NEEDED: 1,
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "SUMP OVERMOLD SERVICE KIT",
                  ITEM_ID: "WD19X28199",
                  NOTES: "",
                  QUANTITY: 1,
                },
                5: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "INNER DOOR ASM",
                  ITEM_ID: "WD31X29644",
                  NOTES:
                    "DD09-21 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                  QUANTITY: 1,
                },
                6: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "DRAIN PUMP ASM",
                  ITEM_ID: "WD19X25461",
                  NOTES: "",
                  QUANTITY: 1,
                },
                7: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "TRANSITION PIECE ASM",
                  ITEM_ID: "WD12X23557",
                  NOTES: "",
                  QUANTITY: 1,
                },
                8: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "30min",
                  ITEM_DESCRIPTION: "FAN VENT ASM",
                  ITEM_ID: "WD24X25325",
                  NOTES: "",
                  QUANTITY: 1,
                },
                9: {
                  ADDITIONAL_TECH_NEEDED: "",
                  ADDITIONAL_TIME_NEEDED: "",
                  ITEM_DESCRIPTION: "DETERGENT MODULE",
                  ITEM_ID: "WD12X28239",
                  NOTES: "",
                  QUANTITY: 1,
                },
              },
              status: "S",
            }
          : {
              NO_RECOMMENDATION_REASON:
                "No Parts Recommended - Inputted appliance model number not valid or complete",
              status: "E",
            };
      console.log("response", response);
      setResult(response);

      setTimeout(() => {
        setIsLoading(false);

        console.log("result?.status :::", result?.status);

        // toast({
        //   title: "API Response received.",
        //   description:
        //     result?.status === "S"
        //       ? "Showing results!"
        //       : "Someting went wrong!",
        //   status: result?.status === "S" ? "success" : "error",
        //   duration: 9000,
        //   isClosable: true,
        // });
      }, 500);

      // Handle successful response here (e.g., clear form, show success message)
      console.log("Data posted successfully!");
    } catch (error) {
      console.error("Error submitting the data:", error);
      // Handle errors here (e.g., show error message)
      // toast({
      //   title: `Someting went wrong!`,
      //   description: `Error submitting the data: ${error}`,
      //   status: "error",
      //   duration: 9000,
      //   isClosable: true,
      // });
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
    // setParam1("");
    // setParam2("");
    // setParam3("");
    // setResult("");
  };

  return (
    <Grid
      templateAreas={`"header header" "nav main" "nav footer"`}
      gridTemplateRows={"76px 2fr 30px"}
      gridTemplateColumns={"400px 1fr"}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem p="2" bg="blue.900" area={"header"}>
        <SVGComponent.CompanyLogo />
      </GridItem>
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
            {/* <FormControl mt={4}>
              <FormLabel htmlFor="serial_num">Param 1</FormLabel>
              <Input
                id="serial_num"
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                placeholder="Any aditional param"
                disabled
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="serial_num">Param 2</FormLabel>
              <Input
                id="serial_num"
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                placeholder="Any aditional param"
                disabled
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="serial_num">Param 3</FormLabel>
              <Input
                id="serial_num"
                value={param3}
                onChange={(e) => setParam3(e.target.value)}
                placeholder="Any aditional param"
                disabled
              />
            </FormControl> */}

            {/* <DynamicForm paramNames={paramNames} param4="param4" /> */}
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
      <GridItem pl="2" area={"footer"}>
        <small>
          Copyright &copy; 2024 GE Appliances, a Haier company GE is a trademark
          of the General Electric Company. Manufactured under trademark license.
        </small>
      </GridItem>
    </Grid>
  );
};

export default PartsPredictorForm;
