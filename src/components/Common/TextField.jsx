import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ label, value, onChange, ...props }) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      sx={{ mt: 2, ...props.sx }} // 必要に応じてスタイルをマージ
      {...props} // 他のプロパティを渡す
    />
  );
};

export default TextField;
