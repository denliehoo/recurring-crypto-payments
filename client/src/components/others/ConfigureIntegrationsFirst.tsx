// import classes from "./ConfigureIntegrationsFirst.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfigureIntegrationsFirst = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>Please complete integrations configurations first</div>
      <Button onClick={() => navigate("/integrations")}>
        Go to configurations
      </Button>
    </div>
  );
};

export default ConfigureIntegrationsFirst;
