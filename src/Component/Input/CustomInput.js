import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
  root: {
    width: "100%",
    "& label.Mui-focused": {
      color: "#f50057",
    },
    "& label": {
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& textarea": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f50057",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#f50057",
      },
      "&:hover fieldset": {
        borderColor: "#f50057",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
    },
  },
})(TextField);

function CustomTextField({ multiline, rows, label, name, onChange, value }) {
  return (
    <CssTextField
      id="standard-basic"
      rows={rows || 1}
      multiline={!!multiline}
      label={label}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
}

export default CustomTextField;
