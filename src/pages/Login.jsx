import { useEffect } from "react";
import { LoginForm } from "../components";

const Login = () => {
  useEffect(() => {
    console.log("I am in Login Page");
  },[]);
  return <LoginForm />;
};

export default Login;
