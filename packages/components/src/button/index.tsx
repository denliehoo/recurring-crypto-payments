import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export const TestButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {label} Hello
    </button>
  );
};
