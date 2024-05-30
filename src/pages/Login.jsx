import { GridItem } from "@chakra-ui/react";
import { LoginForm } from "../components";

const Login = () => {
  return (
    <GridItem pl="2" area={"main"}>
      <LoginForm />
    </GridItem>
  );
};

export default Login;
