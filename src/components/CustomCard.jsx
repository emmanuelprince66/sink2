// CardComponent.js
import React from "react";
import { Card, CardContent } from "@mui/material";

const CustomCard = ({ children, style, color }) => {
  return (
    <Card
      sx={{
        background: color,
      }}
      className={`p-2 ${style}`}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
