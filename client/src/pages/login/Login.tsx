import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiCallAuth } from "../../utils/apiRequest";
import { useDispatch } from "react-redux";
import { addVendorDetails } from "../../slices/vendorDetailsSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
    setError("");
    setFieldErrors({ ...fieldErrors, email: "" });
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setError("");
    setFieldErrors({ ...fieldErrors, password: "" });
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setError("");
    setFieldErrors({ password: "", email: "" });
  };

  const setVendorDetails = async () => {
    const res: any = await apiCallAuth("get", "/vendors/getVendorByToken");
    // console.log(res);

    const { name, email, apiKey, plan, vendorContract, tokenAddress, _id } =
      res.data;
    dispatch(
      addVendorDetails({
        name,
        email,
        apiKey,
        plan,
        vendorContract,
        tokenAddress,
        id: _id,
      })
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post(`${apiUrl}/vendors/login`, {
          email: username,
          password: password,
        });
        // Handle the response data or perform further actions
        // console.log("Response:", res);

        // Redirect to dashboard upon successful login
        if (res.status === 200) {
          localStorage.setItem("JWT", res.data.token);
          await setVendorDetails();
          navigate("/dashboard");
        }
      } catch (error: any) {
        console.log(error);
        setError(error.response.data.error);
      }
    } else {
      // register and login
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const validPassword = passwordRegex.test(password);
      const validEmail = emailRegex.test(username);

      if (!validPassword)
        setFieldErrors({
          ...fieldErrors,
          password:
            "Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character",
        });

      if (!validEmail)
        setFieldErrors({ ...fieldErrors, email: "Enter a valid email" });

      if (!validEmail || !validPassword) {
        setFieldErrors({
          email: validEmail ? "" : "Enter a valid email",
          password: validPassword
            ? ""
            : "Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character",
        });
        return;
      }

      try {
        let res = await axios.post(`${apiUrl}/vendors`, {
          email: username,
          password: password,
        });
        res = await axios.post(`${apiUrl}/vendors/login`, {
          email: username,
          password: password,
        });

        if (res.status === 200) {
          localStorage.setItem("JWT", res.data.token);
          navigate("/dashboard");
        }
      } catch (error: any) {
        console.log(error);
        setError(error.response.data.error);
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">RecurCrypt</Typography>
        <Typography variant="h5">{isLogin ? "Login" : "Register"}</Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Email"
                variant="outlined"
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
                fullWidth
                value={username}
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography sx={{ ml: 2, color: "red" }}>{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
        {/*  */}
        <div style={{ width: "100%" }}>
          <br />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={toggleLoginRegister}
          >
            {isLogin ? "Change To Register" : "Change To Login"}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Login;
