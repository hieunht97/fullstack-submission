import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearState = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    clearState,
  };
};
