import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return alert("Please enter a subject name");

    console.log("New Subject:", subjectName);
    // 👉 You can call API here to POST subjectName
    setSubjectName("");
  };

  return (
<></>
  );
};

export default AddSubject;
