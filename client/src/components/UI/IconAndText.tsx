import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface IconAndTextProps {
  icon: ReactNode;
  text: string;
}

const IconAndText: React.FC<IconAndTextProps> = ({ icon, text }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {icon}
      {text}
    </Box>
  );
};

export default IconAndText;
