import React, { useState, useContext } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { postData } from "../utils/api";

export default function Register() {
  const context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();


  //   if (!formFields.name.trim()) {
  //     context.alertBox("Please fill the name", "error");
  //     return;
  //   }
  //   if (!formFields.email.trim()) {
  //     context.alertBox("Please fill the email", "error");
  //     return;
  //   }
  //   if (!formFields.password.trim()) {
  //     context.alertBox("Please fill the password", "error");
  //     return;
  //   }

  //   try {
  //     const res = postData("/api/user/register", formFields);

  //     if (res.success) {
  //       context.alertBox(res?.data.message || "Registered successfully", "success");
  //       setFormFields({ name: "", email: "", password: "" }); // clear form
  //       history("/login");
  //     } 
  //   } catch (err) {
  //     context.alertBox("Something went wrong. Please try again.", "error");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!formFields.name.trim()) {
    context.alertBox("Please fill the name", "error");
    return;
  }
  if (!formFields.email.trim()) {
    context.alertBox("Please fill the email", "error");
    return;
  }
  if (!formFields.password.trim()) {
    context.alertBox("Please fill the password", "error");
    return;
  }

  try {
    // Wait for API call to finish
    const res = await postData("/api/user/register", formFields);

    if (res?.success) {
      context.alertBox(res?.data?.message || "Registered successfully", "success");
      setFormFields({ name: "", email: "", password: "" }); // clear form
      history("/login");
    } else {
      context.alertBox(res?.data?.message || "Registration failed", "error");
    }
  } catch (err) {
    console.error("Registration error:", err);
    context.alertBox("Something went wrong. Please try again.", "error");
  }
};

  return (
<Box
  sx={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffffff, #f5f5f5)", // white gradient
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Roboto', sans-serif",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Animated Background */}
  <Box
    sx={{
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundImage: `
      url('https://cdn-icons-png.flaticon.com/512/2721/2721292.png'),  /* Algorithm icon */
            url('https://cdn-icons-png.flaticon.com/512/1005/1005141.png'),  /* Code icon */
            url('https://cdn-icons-png.flaticon.com/512/6489/6489123.png')   /* Brain icon */
      `,
      backgroundRepeat: "no-repeat, no-repeat, no-repeat",
      backgroundPosition: "20% 10%, 70% 30%, 50% 70%",
      backgroundSize: "60px, 60px, 60px",
      animation: "floatCoins 10s infinite linear",
      opacity: 0.25,
      filter: "brightness(0)", // makes icons black
    }}
  ></Box>

  {/* Register Form */}
  <Paper
    elevation={12}
    sx={{
      p: { xs: 3, sm: 5 },
      borderRadius: 3,
      width: { xs: "90%", sm: 400 },
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      color: "#000",
      zIndex: 1,
    }}
  >
    <Typography
      variant="h4"
      sx={{ textAlign: "center", mb: 2, fontWeight: "bold", color: "#000" }}
    >
      REGISTER
    </Typography>

    <TextField
      variant="filled"
      label="Name"
      name="name"
      value={formFields.name}
      onChange={handleChange}
      fullWidth
      sx={{
        input: { color: "#000" },
        label: { color: "#555" },
        "& .MuiFilledInput-root": { backgroundColor: "#f0f0f0" },
      }}
    />

    <TextField
      variant="filled"
      label="Email"
      type="email"
      name="email"
      value={formFields.email}
      onChange={handleChange}
      fullWidth
      sx={{
        input: { color: "#000" },
        label: { color: "#555" },
        "& .MuiFilledInput-root": { backgroundColor: "#f0f0f0" },
      }}
    />

    <TextField
      variant="filled"
      label="Password"
      type="password"
      name="password"
      value={formFields.password}
      onChange={handleChange}
      fullWidth
      sx={{
        input: { color: "#000" },
        label: { color: "#555" },
        "& .MuiFilledInput-root": { backgroundColor: "#f0f0f0" },
      }}
    />

    <Button
      variant="contained"
      onClick={handleSubmit}
      sx={{
        background: "linear-gradient(45deg, #ff9900, #ff6600)",
        color: "#fff",
        fontWeight: "bold",
        "&:hover": {
          background: "linear-gradient(45deg, #ffb84d, #ff7f0f)",
        },
      }}
    >
      Register
    </Button>

    <Typography variant="body2" sx={{ textAlign: "center", mt: 1, color: "#000" }}>
      Already have an account?{" "}
      <a href="/login" style={{ color: "#ff6600" }}>
        Login
      </a>
    </Typography>
  </Paper>

  {/* Floating coin animation keyframes */}
  <style>
    {`
      @keyframes floatCoins {
        0% {background-position: 20% 10%, 70% 30%, 50% 70%;}
        50% {background-position: 30% 50%, 60% 40%, 40% 90%;}
        100% {background-position: 20% 10%, 70% 30%, 50% 70%;}
      }
    `}
  </style>
</Box>

  );
}
