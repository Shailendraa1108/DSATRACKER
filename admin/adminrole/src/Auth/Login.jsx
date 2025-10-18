import React, { useContext, useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";


import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { postData } from "../utils/api";

export default function Login() {
    const context = useContext(MyContext)
    const history = useNavigate()
    const [formFields, setformFields] = useState({

        email: "",
        password: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formFields, "login")
        if (formFields.email === "") {
            context.alertBox("please fill the email", "error")
            return false
        }
        if (formFields.password === "") {
            context.alertBox("please fill the password", "error")
            return false
        }
        postData("/api/user/login", formFields)
            .then((res) => {
                if (res.success) {
                    context.alertBox(res.message || "Login successful", "success");
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("user", JSON.stringify(res.user));
                    localStorage.setItem("userId", res.user._id);
                   
                        history("/");
                  
                } else {
                    context.alertBox(res.message || "Login failed", "error");
                }
            })
            .catch((err) => {
                console.error("Login Error:", err);
                context.alertBox("Something went wrong. Please try again.", "error");
            });




    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setformFields((prev) => ({
            ...prev,
            [name]: value

        }))
    }
    return (
        <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating DSA icons */}
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
          backgroundSize: "70px, 70px, 70px",
          animation: "floatIcons 10s infinite linear",
          opacity: 0.2,
        }}
      ></Box>

      {/* Login form */}
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          width: { xs: "90%", sm: 360 },
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          color: "#000",
          zIndex: 1,
          border: "1px solid #ddd",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            letterSpacing: 1,
            color: "#222",
          }}
        >
           LOGIN
        </Typography>

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
            "& .MuiFilledInput-root": {
              backgroundColor: "#f5f5f5",
              "&:hover": { backgroundColor: "#ebebeb" },
            },
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
            "& .MuiFilledInput-root": {
              backgroundColor: "#f5f5f5",
              "&:hover": { backgroundColor: "#ebebeb" },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(45deg, #000, #333)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            "&:hover": {
              background: "linear-gradient(45deg, #333, #000)",
            },
          }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 1, color: "#444" }}
        >
          Don’t have an account?{" "}
          <a href="/register" style={{ color: "#000", textDecoration: "underline" }}>
            Register
          </a>
        </Typography>
      </Paper>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes floatIcons {
            0% {background-position: 20% 10%, 70% 30%, 50% 70%;}
            50% {background-position: 25% 50%, 60% 40%, 45% 90%;}
            100% {background-position: 20% 10%, 70% 30%, 50% 70%;}
          }
        `}
      </style>
    </Box>
    );
}
