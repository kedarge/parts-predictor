import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { Fragment } from "react";

const DynamicForm = ({ paramNames = [], formData, setFormData }) => {
  const handleChange = (param, value) => {
    setFormData({ ...formData, [param]: value });
  };

  return (
    <Fragment>
      {paramNames.map((param) => (
        <FormControl key={param} id={param} mt={4}>
          <FormLabel htmlFor={param}>{param}</FormLabel>
          <Input
            value={formData[param] || ""}
            onChange={(e) => handleChange(param, e.target.value)}
          />
        </FormControl>
      ))}
    </Fragment>
  );
};

export default DynamicForm;
