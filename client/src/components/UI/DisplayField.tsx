import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import Tooltip from "@mui/material/Tooltip";
import { SxProps } from "@mui/material";

interface DisplayFieldProps {
  label: string;
  text: string;
  hideOption: boolean;
  sx?: SxProps;
}

const DisplayField: React.FC<DisplayFieldProps> = ({
  label,
  text,
  hideOption,
  sx,
}) => {
  const [showKeys, setShowKeys] = useState(!hideOption); // Show the keys by default if hideOption is false
  const [isCopied, setIsCopied] = useState(false);

  const handleToggleVisibility = () => {
    setShowKeys((prevShowKeys) => !prevShowKeys);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        // Hide the success message after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      },
      (error) => {
        console.error("Failed to copy text: ", error);
      }
    );
  };

  return (
    <TextField
      label={label}
      value={showKeys ? text : "***********************"} // Show text when 'showKeys' is true
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {hideOption && (
              <IconButton onClick={handleToggleVisibility}>
                {showKeys ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
            <Tooltip
              open={isCopied} // Show the tooltip when 'isCopied' is true
              title={"Copied to clipboard!"}
              placement="top"
            >
              <IconButton onClick={handleCopyToClipboard}>
                <FileCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      fullWidth
      sx={sx ? sx : { mb: 2 }} // if no style specified, use mb: 2
    />
  );
};

export default DisplayField;
