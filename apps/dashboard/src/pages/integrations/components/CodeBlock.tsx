import React, { useState, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IconButton, Box } from "@mui/material";
import { FileCopyOutlined, WbSunny, Brightness2 } from "@mui/icons-material";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const codeRef = useRef<HTMLDivElement | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const copyToClipboard = () => {
    if (codeRef.current) {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const style = isDarkMode ? atomOneDark : atomOneLight;

  return (
    <div className="code-block">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={toggleDarkMode}>
          {isDarkMode ? <Brightness2 /> : <WbSunny />}
        </IconButton>
        <IconButton onClick={copyToClipboard}>
          <FileCopyOutlined />
        </IconButton>
      </Box>
      <div className="code-container" ref={codeRef}>
        <SyntaxHighlighter
          language="javascript"
          style={style}
          customStyle={{ overflowX: "auto" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
