import { Outlet, Navigate } from "react-router-dom";
import { Navbar } from "../components";
const Home = ({ user }) => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Home;
