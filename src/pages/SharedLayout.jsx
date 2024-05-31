import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components";
import { ROUTES } from "../utills/constants";

const templateAreas = `"header header" "nav main" "nav footer"`;
const templateLoginAreas = `"header header" "main main" "footer footer"`;

const Home = ({ user }) => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Grid
      templateAreas={
        location.pathname.includes(ROUTES.LOGIN.PATH)
          ? templateLoginAreas
          : templateAreas
      }
      gridTemplateRows={"76px 2fr 30px"}
      gridTemplateColumns={"400px 1fr"}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <Navbar />
      <Outlet />

      <GridItem pl="2" area={"footer"}>
        <small>
          Copyright &copy; {new Date().getFullYear()} GE Appliances, a Haier
          company GE is a trademark of the General Electric Company.
          Manufactured under trademark license.
        </small>
      </GridItem>
    </Grid>
  );
};
export default Home;
