// import classes from "./VerifyEmail.module.css";

import { useNavigate, useParams } from "react-router-dom";
import CentrePage from "../../components/UI/CentrePage";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      const headers = {
        Authorization: token,
      };

      try {
        const res = await axios.post(`${apiUrl}/vendors/verify-email`, null, {
          headers,
        });

        if (res.status === 200) {
          setIsVerified(true);
        }
      } catch (err: any) {
        console.log(err);
        setError(err.response.data.error);
      }
      setIsLoading(false);
    };
    verifyEmail();
  }, []);

  return (
    <CentrePage>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6">
            {isVerified ? "You have been verified" : `Error: ${error}`}
          </Typography>

          <Button onClick={() => navigate("/login")} variant="contained">
            Proceed To Login
          </Button>
        </Box>
      )}
    </CentrePage>
  );
};

export default VerifyEmail;
