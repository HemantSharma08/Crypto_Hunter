import React from "react";
import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      component="span"
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: "5px",
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        width: {
          xs: "45%",
          sm: "30%",
          md: "22%",
        },
        textAlign: "center",
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;