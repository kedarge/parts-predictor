import { GridItem } from "@chakra-ui/react";
import { SVGComponent } from "./";

const Navbar = () => {
  return (
    <GridItem p="2" bg="blue.900" area={"header"}>
      <SVGComponent.CompanyLogo />
    </GridItem>
  );
};

export default Navbar;
