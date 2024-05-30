import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [sso, setSso] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("userSSO", "");
  }, []);

  const handleSignIn = async () => {
    // Validate email and password
    // /authenticate/?uname="320003207"&pwd="testing123"

    const queryParams = new URLSearchParams({
      uname: encodeURIComponent(sso), // Encode each parameter value
      pwd: encodeURIComponent(password),
    });

    try {
      setIsLoading(true);
      await axios
        .get(`${process.env.REACT_APP_API_ORIGIN}/authenticate/?${queryParams}`)
        .then((res) => {
          console.log("response", res.data);
          setIsLoading(false);
          // setResult(res.data);

          if (res?.data?.status === "S") {
            // setup the session
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userSSO", sso);
          } else {
            sessionStorage.setItem("isLoggedIn", "false");
            sessionStorage.setItem("userSSO", "");
          }

          console.log("res ::", res);

          // show the tost message
          toast({
            title:
              res.data?.status === "S"
                ? "Logged in successfully."
                : "Login failed",
            description:
              res.data?.status === "S"
                ? `${sso} You have been logged in.`
                : res.data?.message || "Someting went wrong!",
            status: res.data?.status === "S" ? "success" : "error",
            duration: 9000,
            isClosable: true,
          });

          setIsLoading(false);

          // after login navigate
          navigate("/");
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
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error submitting the data:", error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Part Predictor</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="sso">
              <FormLabel>SSO ID</FormLabel>
              <Input
                type="text"
                value={sso}
                onChange={(e) => setSso(e.target.value)}
                disabled={isLoading}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignIn}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
