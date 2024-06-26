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
import PredictorResult from "./PredictorResult";

import axios from "axios";

import { InfoIcon } from "@chakra-ui/icons";
// import { SVGComponent } from "./SVGComponent";

const PartsPredatorForm = () => {
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [prdLn, setPrdLn] = useState("dishwashers");
  const [param1, setParam1] = useState("");
  const [param2, setParam2] = useState("");
  const [param3, setParam3] = useState("");
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
        param1 ||
        param2 ||
        param3
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      sku: encodeURIComponent(sku), // Encode each parameter value
      description: encodeURIComponent(description),
      remarks: encodeURIComponent(remarks),
      create_date: encodeURIComponent(createDate),
      serial_num: encodeURIComponent(serialNum),
      prd_ln: encodeURIComponent(prdLn),
      param1: encodeURIComponent(param1), // Placeholder
      param2: encodeURIComponent(param2), // Placeholder
      param3: encodeURIComponent(param3), // Placeholder
    };

    const queryParams = new URLSearchParams(payload); // Create URLSearchParams object
    
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
      /*
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
                  NOTES: "DD09-21",
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

        toast({
          title: "API Response received.",
          description:
            result?.status === "S"
              ? "Showing results!"
              : "Someting went wrong!",
          status: result?.status === "S" ? "success" : "error",
          duration: 9000,
          isClosable: true,
        });
      }, 500);

      */

      // Handle successful response here (e.g., clear form, show success message)
      console.log("Data posted successfully!");
    } catch (error) {
      console.error("Error submitting the data:", error);
      // Handle errors here (e.g., show error message)
      toast({
        title: `Someting went wrong!`,
        description: `Error submitting the data: ${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const clearForm = () => {
    setResult("");
  };

  const clearAll = () => {
    setSku("");
    setDescription("");
    setRemarks("");
    setCreateDate("");
    setSerialNum("");
    setPrdLn("");
    setParam1("");
    setParam2("");
    setParam3("");
    setResult("");
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
        <svg width="232.38" height="61.89" role="img">
          <title id="logo-title">GE Appliances, a Haier company</title>
          <defs></defs>
          <path
            className="logo"
            d="M31,61.89A30.95,30.95,0,1,1,61.88,30.94,30.93,30.93,0,0,1,31,61.89M31,1.45A29.49,29.49,0,1,0,60.43,30.94,29.49,29.49,0,0,0,31,1.45M57.16,39.76s-.06.07-.16,0-.09-.06-.09-.1a23.75,23.75,0,0,0,1-6.6c0-3.78-1.55-6.09-3.51-6.09a2,2,0,0,0-2.06,2.14c0,2.31,2.83,2.49,2.83,7.55a20.1,20.1,0,0,1-1.11,6.16C50.91,53.57,40.8,58.54,31,58.54a24.5,24.5,0,0,1-8.74-1.37.14.14,0,0,1,0-.17s.09-.1.12-.08a21.6,21.6,0,0,0,6.59,1c3.77,0,6-1.54,6-3.43a2.12,2.12,0,0,0-2.14-2.14c-2.32,0-2.49,2.91-7.46,2.91A20.6,20.6,0,0,1,19,54.17C8.4,50.91,3.33,40.88,3.34,30.94A28.51,28.51,0,0,1,4.73,22.2s.07-.05.15,0a.15.15,0,0,1,.09.12,22.3,22.3,0,0,0-1,6.59c0,3.78,1.54,6,3.52,6a2,2,0,0,0,2.05-2.05c0-2.32-2.83-2.57-2.83-7.55A20.32,20.32,0,0,1,7.8,19C11.05,8.4,21.08,3.42,31,3.34a26.33,26.33,0,0,1,8.73,1.45.14.14,0,0,1,0,.16.12.12,0,0,1-.12.09A18.82,18.82,0,0,0,33,3.94c-3.69,0-6,1.55-6,3.52a2,2,0,0,0,2.14,2.05c2.31,0,2.49-2.83,7.46-2.83A20.32,20.32,0,0,1,42.85,7.8c10.72,3.26,15.59,13.37,15.69,23.14a27.12,27.12,0,0,1-1.38,8.82M42.42,32.4a4.91,4.91,0,0,0-5.14,4.71c0,2.15,1.29,3.86,3,3.86a1.1,1.1,0,0,0,1.2-1.11c0-1.12-1.47-1.39-1.36-3A2.09,2.09,0,0,1,42.25,35c2.06,0,3,2,3,4.05a5.27,5.27,0,0,1-5.16,5.38c-3.6,0-5.91-3.43-5.91-7.12,0-5.48,3.6-7.63,5.48-8.14,0,0,4.93.88,4.78-1.29-.07-1-1.49-1.31-2.51-1.36a7,7,0,0,0-2.28.37,2.81,2.81,0,0,1-1.27-1.58c3.51-2.66,6-5.23,6-8.14a2.8,2.8,0,0,0-3-2.91c-3.52,0-6.17,4.45-6.17,8.48a7.39,7.39,0,0,0,.17,2,81.35,81.35,0,0,1-6.89,4.44,15.52,15.52,0,0,1,.33-2.59c1-1.12,2.44-2.8,2.44-4.08a1,1,0,0,0-1-1.11c-1.71,0-3,2.57-3.34,4.37a5.63,5.63,0,0,1-3.6,2.14,1.56,1.56,0,0,1-1.46-1.28c3.26-1.11,7.29-5.57,7.29-9.6a2.59,2.59,0,0,0-2.91-2.74c-3.86,0-7.12,5.74-7.12,10.19-1.37,0-1.88-1.45-1.88-2.57a17,17,0,0,1,.43-2.57.69.69,0,0,0-.69-.77c-1.29,0-2.06,1.71-2.06,3.68a4.5,4.5,0,0,0,4.29,4.64A3.93,3.93,0,0,0,22.8,30a5.3,5.3,0,0,0,3.43-1.2c-.09.59-.17,1.11-.26,1.63-3.77,2-6.52,3.34-9,5.57a8.92,8.92,0,0,0-3.09,6.09,4.72,4.72,0,0,0,5,5c3.95,0,7-3.18,8.4-7.55a33.63,33.63,0,0,0,1.14-7.79,77.9,77.9,0,0,0,7.86-5,3.55,3.55,0,0,0,.86,1A10.7,10.7,0,0,0,31,37.63c0,4.46,3,9.43,8.91,9.43a8.16,8.16,0,0,0,8.23-7.89c0-3.51-2-6.77-5.75-6.77m-23.57,12a2,2,0,0,1-2.14-2.13c0-3.69,5.11-7.2,9-9.09-.68,5.14-2.42,11-6.83,11.22m2.83-20.23c0-2.83,2.79-8.21,4.51-7.64,2,.67-1.68,6.09-4.51,7.64m16.2-1.29c0-3.52,2.39-6.93,3.68-6.28,1.48.74-1.1,4-3.68,6.28"
          ></path>
          <path
            className="logo"
            d="M77.69,31v0a5.88,5.88,0,0,1,6.11-5.89,6.6,6.6,0,0,1,4.6,1.65l-1.85,2.22a4,4,0,0,0-2.74-1.07A3,3,0,0,0,80.92,31v0A3,3,0,0,0,84,34.13a3.19,3.19,0,0,0,1.82-.47V32.28H83.57V30h5.21v5.11a7.7,7.7,0,0,1-4.92,1.75A5.83,5.83,0,0,1,77.69,31"
          ></path>
          <polygon
            className="logo"
            points="92.15 25.27 101.27 25.27 101.27 27.94 95.26 27.94 95.26 29.66 100.7 29.66 100.7 32.14 95.26 32.14 95.26 33.94 101.34 33.94 101.34 36.61 92.15 36.61 92.15 25.27"
          ></polygon>
          <path
            className="logo"
            d="M114.58,25.19h3l4.83,11.42h-3.37l-.83-2h-4.37l-.81,2h-3.3Zm2.76,7-1.26-3.22-1.28,3.22Z"
          ></path>
          <path
            className="logo"
            d="M125.15,25.27H130c2.87,0,4.72,1.48,4.72,4v0c0,2.67-2.06,4.08-4.88,4.08H128.3v3.24h-3.15Zm4.64,5.64c1.11,0,1.79-.58,1.79-1.48v0c0-1-.68-1.49-1.81-1.49H128.3v3Z"
          ></path>
          <path
            className="logo"
            d="M137.67,25.27h4.85c2.87,0,4.72,1.48,4.72,4v0c0,2.67-2.06,4.08-4.88,4.08h-1.55v3.24h-3.14Zm4.63,5.64c1.11,0,1.79-.58,1.79-1.48v0c0-1-.68-1.49-1.81-1.49h-1.47v3Z"
          ></path>
          <polygon
            className="logo"
            points="150.18 25.27 153.32 25.27 153.32 33.86 158.81 33.86 158.81 36.61 150.18 36.61 150.18 25.27"
          ></polygon>
          <rect
            className="logo"
            x="161.84"
            y="25.27"
            width="3.16"
            height="11.33"
          ></rect>
          <path
            className="logo"
            d="M172.6,25.19h3l4.83,11.42h-3.36l-.83-2h-4.37l-.81,2h-3.31Zm2.75,7-1.26-3.22-1.28,3.22Z"
          ></path>
          <polygon
            className="logo"
            points="183.17 25.27 186.1 25.27 190.76 31.27 190.76 25.27 193.87 25.27 193.87 36.61 191.12 36.61 186.28 30.39 186.28 36.61 183.17 36.61 183.17 25.27"
          ></polygon>
          <path
            className="logo"
            d="M197.11,31v0a5.82,5.82,0,0,1,6-5.89,5.54,5.54,0,0,1,4.81,2.36l-2.36,1.83a3.05,3.05,0,0,0-2.48-1.33,2.81,2.81,0,0,0-2.71,3v0a2.81,2.81,0,0,0,2.71,3,3.09,3.09,0,0,0,2.56-1.38L208,34.28A6,6,0,0,1,197.11,31"
          ></path>
          <polygon
            className="logo"
            points="210.93 25.27 220.05 25.27 220.05 27.94 214.04 27.94 214.04 29.66 219.48 29.66 219.48 32.14 214.04 32.14 214.04 33.94 220.13 33.94 220.13 36.61 210.93 36.61 210.93 25.27"
          ></polygon>
          <path
            className="logo"
            d="M222.49,34.92l1.75-2.08a5.8,5.8,0,0,0,3.67,1.35c.84,0,1.3-.29,1.3-.77v0c0-.47-.38-.73-1.91-1.09-2.42-.55-4.28-1.23-4.28-3.56v0c0-2.11,1.67-3.63,4.39-3.63a7.2,7.2,0,0,1,4.67,1.5L230.5,28.8a5.65,5.65,0,0,0-3.17-1.11c-.76,0-1.13.32-1.13.72v0c0,.52.39.74,2,1.1,2.6.56,4.22,1.41,4.22,3.53v0c0,2.32-1.82,3.69-4.58,3.69a7.89,7.89,0,0,1-5.31-1.88"
          ></path>
          <path
            className="logo"
            d="M77.64,49.74c0-2,1.84-4.47,3.78-4.47a2,2,0,0,1,1.61.89l.28-.73h1.13l-1.18,5.69c-.08.39-.07.75.35.75s1-.6,1.52-1.65l.34.18c-.58,1.32-1.36,2-2.08,2-.88,0-1.43-.51-1.33-1.74H82c-.25.45-.87,1.74-2.23,1.74s-2.13-1.11-2.13-2.69m5-2.5c0-1.13-.43-1.49-1.06-1.49-1.32,0-2.6,2.71-2.6,4.94,0,.67.24,1.18.93,1.18,1.82,0,2.73-3.21,2.73-4.63"
          ></path>
          <path
            className="logo"
            d="M130.64,49.69a4.57,4.57,0,0,1,4.05-4.43,1.47,1.47,0,0,1,1.67,1.43A1.24,1.24,0,0,1,135.25,48a.63.63,0,0,1-.67-.62c0-.45.75-1.16.8-1.45s0-.33-.35-.33c-1.75,0-3,2.78-3,5,0,.84.4,1.19,1.17,1.19a3.55,3.55,0,0,0,2.46-1.5l.31.22a3.92,3.92,0,0,1-3,1.87,2.52,2.52,0,0,1-2.31-2.74"
          ></path>
          <path
            className="logo"
            d="M136.84,49.41c0-2.39,2.08-4.18,3.6-4.18a2.82,2.82,0,0,1,2.76,3,4.28,4.28,0,0,1-3.69,4.13,2.71,2.71,0,0,1-2.67-3m5-2.07c0-1.12-.39-1.71-1.27-1.71-1.18,0-2.34,2.3-2.34,4.63,0,1.11.36,1.73,1.25,1.73,1,0,2.36-2,2.36-4.65"
          ></path>
          <path
            className="logo"
            d="M152,50.43l.85-3.77c.12-.52.08-.89-.46-.89-1,0-2,1.38-2.34,3l-.78,3.52H148l1.2-5.62c.11-.52.08-.89-.47-.89-1,0-2,1.38-2.36,3l-.75,3.52h-1.35l1.25-6c.05-.26-.13-.4-1.17-.49l.1-.4L147,45.3l-.42,1.7h.07c.15-.37.89-1.77,2.22-1.77s1.49,1.05,1.49,1.77c.16-.37.9-1.77,2.22-1.77s1.68,1.18,1.45,2.26L153.26,51c-.08.4,0,.79.35.79s1-.6,1.53-1.65l.33.18c-.57,1.32-1.33,2-2.08,2a1.49,1.49,0,0,1-1.38-2"
          ></path>
          <path
            className="logo"
            d="M154.55,55.12h.13c.8,0,.91-.14,1-.65l1.68-8.11c.06-.34-.11-.48-1.15-.57l.1-.41L159,45.3l-.41,1.7h.06a2.89,2.89,0,0,1,2.32-1.78,2.46,2.46,0,0,1,2.23,2.7c0,2-1.94,4.46-3.87,4.46a1.92,1.92,0,0,1-1.64-.76L157,54.56c-.08.39,0,.56.69.56h.47l-.1.43h-3.65ZM161.78,47c0-.67-.33-1.18-1-1.18-1.83,0-2.83,3.25-2.83,4.67,0,1.13.52,1.49,1.15,1.49,1.33,0,2.75-2.79,2.7-5"
          ></path>
          <path
            className="logo"
            d="M163.75,49.69c0-2,1.84-4.47,3.78-4.47a2,2,0,0,1,1.62.9l.27-.74h1.14l-1.19,5.7c-.08.39-.06.75.35.75s1-.6,1.52-1.65l.34.18c-.58,1.32-1.36,2-2.08,2-.88,0-1.42-.5-1.33-1.73h-.07c-.24.44-.86,1.73-2.22,1.73s-2.13-1.1-2.13-2.69m5-2.49c0-1.13-.43-1.49-1-1.49-1.33,0-2.61,2.71-2.61,4.94,0,.68.24,1.18.93,1.18,1.82,0,2.73-3.21,2.73-4.63"
          ></path>
          <path
            className="logo"
            d="M176.83,45.77c-1,0-2.18,1.38-2.53,3l-.75,3.52h-1.34l1.24-6c.05-.26-.12-.4-1.17-.49l.1-.41L175,45.3l-.41,1.7h.06a3.06,3.06,0,0,1,2.39-1.78c1.18,0,1.68,1.19,1.44,2.27l-.81,3.56c-.07.39-.05.78.36.78s1-.6,1.52-1.65l.34.18c-.58,1.32-1.33,2-2.08,2a1.48,1.48,0,0,1-1.38-2l.84-3.77c.12-.52.08-.89-.46-.89"
          ></path>
          <path
            className="logo"
            d="M179.89,54.11a1.08,1.08,0,0,1,1-1.12.65.65,0,0,1,.7.62c0,.43-.46.91-.61,1.2s.14.38.43.38c1.76,0,2.62-1.51,3.26-4.54h-.06a3,3,0,0,1-2.35,1.78c-1.2,0-1.69-1.17-1.35-2.67l.79-3.5c.06-.25,0-.4-1-.49l.09-.4,2.53-.1-1.2,5.32c-.19.85-.17,1.29.39,1.29,1,0,2.12-1.37,2.48-3l.75-3.51h1.35l-1.37,6.48a4.51,4.51,0,0,1-4.17,3.69,1.49,1.49,0,0,1-1.62-1.44"
          ></path>
          <path
            className="logo"
            d="M121.93,49.05a3.15,3.15,0,0,0,0-.44,4.1,4.1,0,1,0-4.09,4,4.1,4.1,0,0,0,3.8-2.51l-1.77-.31a2.25,2.25,0,0,1-2,1.2,2.29,2.29,0,0,1-2.23-2Zm-4-2.78A2.29,2.29,0,0,1,120,47.76h-4.23a2.27,2.27,0,0,1,2.11-1.49"
          ></path>
          <rect
            className="logo"
            x="110.59"
            y="44.78"
            width="2.09"
            height="7.7"
          ></rect>
          <path
            className="logo"
            d="M111.63,41.64a1.17,1.17,0,1,0,1.16,1.16,1.16,1.16,0,0,0-1.16-1.16"
          ></path>
          <polygon
            className="logo"
            points="97.78 42.31 97.78 46.45 93.27 46.45 93.27 42.31 90.99 42.31 90.99 52.47 93.27 52.47 93.27 48.32 97.78 48.32 97.78 52.47 100.07 52.47 100.07 42.31 97.78 42.31"
          ></polygon>
          <path
            className="logo"
            d="M107.22,44.78v.41a4,4,0,1,0,0,6.88v.4h2V44.78Zm-2,6.15a2.32,2.32,0,1,1,2.34-2.31,2.32,2.32,0,0,1-2.34,2.31"
          ></path>
          <path
            className="logo"
            d="M126.29,44.06a4.16,4.16,0,0,0-3.42,4v4.38h2V48a2,2,0,0,1,1.75-2Z"
          ></path>
        </svg>
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
                    label="Enter date to reference connected data for this appliance. Prediction will not consider connected data after this date."
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
                <option value="dishwashers">Dishwashers</option>
                <option value="dryers">Dryers</option>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            <FormControl mt={4}>
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
            </FormControl>

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
                    <Text color="green.300">Plesae submit the form</Text>
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

export default PartsPredatorForm;
