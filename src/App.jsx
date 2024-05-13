import { ChakraProvider } from "@chakra-ui/react";
import PartsPredictorForm from "./components/PartsPredictorForm";

function App() {
  return (
    <ChakraProvider>
      <PartsPredictorForm />
    </ChakraProvider>
  );
}



export default App;
