import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,IconButton
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from "@mui/material";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";
import {useNavigate} from "react-router-dom"
function HeaderPage() {
  const context = useContext(MyContext);
const history = useNavigate()
  // State for adding subject
  const [subjectName, setSubjectName] = useState({ name: "" });

  // State for adding topic
  const [formData, setFormData] = useState({
    subject_id: "",
    name: "",
    leetcode: "",
    youtube: "",
    article: "",
    level: "",
    status: "",
  });

  const [subjects, setSubjects] = useState([]);

 
  useEffect(() => {
    fetchDataFromApi("/subject/get").then((res) => {
        console.log("jnjnjnnjjnn",res)
      if (Array.isArray(res)) setSubjects(res);
    });
  }, []);

  
  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setSubjectName((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSubject = (e) => {
    e.preventDefault();
    if (!subjectName.name.trim()) {
      context.alertBox("Please fill the subject name", "error");
      return;
    }
    postData("/subject/create", subjectName).then((res) => {
      context.alertBox("Subject added successfully", "success");
      setSubjects((prev) => [...prev, res.subject]);
      setSubjectName({ name: "" });
    });
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    if (!formData.subject_id || !formData.name) {
      context.alertBox("Please fill all required fields", "error");
      return;
    }
    postData("/topic/create", formData).then((res) => {
      context.alertBox("Topic added successfully", "success");
      setFormData({
        subject_id: "",
        name: "",
        leetcode: "",
        youtube: "",
        article: "",
        level: "",
        status: "",
      });
    });
  };



  const logoutUser = async () => {
    const token = localStorage.getItem("token");
    const res = await postData("/api/user/logout", {}, token);

    if (res?.success) {
      context.alertBox(res.message, "success");
      localStorage.removeItem("token");
      history("/login");
    } else {
      context.alertBox("Logout failed", "error");
    }
  };



  
  // Delete handler (you can connect it with your API later)
  const handleDelete = (topicId) => {
    alert(topicId)
    deleteData(`/subject/delete/${topicId}`).then((res)=>{
        console.log(res,"bbjb")
         fetchDataFromApi("/subject/get").then((res) => {
        console.log("jnjnjnnjjnn",res)
      if (Array.isArray(res)) setSubjects(res);
    });

    })
  };
  return (
    <>
      {/* Header */}
      <Box
        component="header"
        sx={{
          width: "100%",
          height: 70,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#1e88e5",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ flex: 1, textAlign: "center", fontWeight: 600, margin: 0 }}
        >
          My Dashboard
        </Typography>

       
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff5252",
            color: "#fff",
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: "8px",
            boxShadow: 3,
            "&:hover": { backgroundColor: "#ff7070" },
            height: "42px",
          }}
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Box>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 70px)",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" mb={3} textAlign="center">
            Add New Subject
          </Typography>

          <form onSubmit={handleSubmitSubject}>
            <Stack spacing={3}>
              <TextField
                label="Subject Name"
                variant="outlined"
                value={subjectName.name}
                name="name"
                onChange={handleSubjectChange}
                fullWidth
              />
              <Button type="submit" variant="contained" fullWidth>
                Add Subject
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>

 
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
          <Typography variant="h5" mb={3} textAlign="center">
            Add New Topic
          </Typography>

          <form onSubmit={handleSubmitTopic}>
            <Stack spacing={3}>
              {/* Subject Dropdown */}
              <FormControl fullWidth>
                <InputLabel>Select Subject</InputLabel>
                <Select
                  name="subject_id"
                  value={formData.subject_id}
                  label="Select Subject"
                  onChange={handleFormChange}
                >
                  {subjects.map((subj) => (
                    <MenuItem key={subj._id} value={subj._id}>
                      {subj.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Topic Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                fullWidth
              />

              <TextField
                label="LeetCode Link"
                name="leetcode"
                value={formData.leetcode}
                onChange={handleFormChange}
                fullWidth
              />

              <TextField
                label="YouTube Link"
                name="youtube"
                value={formData.youtube}
                onChange={handleFormChange}
                fullWidth
              />

              <TextField
                label="Article Link"
                name="article"
                value={formData.article}
                onChange={handleFormChange}
                fullWidth
              />

              {/* Level Dropdown */}
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  label="Level"
                  onChange={handleFormChange}
                >
                  <MenuItem value="EASY">EASY</MenuItem>
                  <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                  <MenuItem value="HARD">HARD</MenuItem>
                </Select>
              </FormControl>

              {/* Status Dropdown */}
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleFormChange}
                >
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>

              <Button type="submit" variant="contained" fullWidth>
                Add Topic
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>


    







<Box sx={{ padding: 3 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Subjects and Topics
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Subject Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Topic Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Level
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                LeetCode
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                YouTube
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Article
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subjects.length > 0 ? (
              subjects.map((subject) =>
                subject.topics.map((topic, index) => (
                  <TableRow
                    key={topic._id || index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f1f1f1" },
                    }}
                  >
                    {/* ✅ Show subject name and delete icon only once per subject */}
                    {index === 0 && (
                      <>
                        <TableCell
                          align="center"
                          rowSpan={subject.topics.length}
                          sx={{
                            fontWeight: "bold",
                            verticalAlign: "middle",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {subject.name}
                        </TableCell>

                        {/* Delete button cell spanning all topic rows */}
                        <TableCell
                          align="center"
                          rowSpan={subject.topics.length}
                          sx={{
                            verticalAlign: "middle",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(subject._id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </TableCell>
                      </>
                    )}

                    <TableCell align="center">{topic.name}</TableCell>
                    <TableCell align="center">{topic.level}</TableCell>
                    <TableCell align="center">{topic.status}</TableCell>
                    <TableCell align="center">
                      <Link
                        href={topic.leetcode}
                        target="_blank"
                        underline="hover"
                        color="primary"
                      >
                        LeetCode
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        href={topic.youtube}
                        target="_blank"
                        underline="hover"
                        color="primary"
                      >
                        YouTube
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        href={topic.article}
                        target="_blank"
                        underline="hover"
                        color="primary"
                      >
                        Article
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
}

export default HeaderPage;
