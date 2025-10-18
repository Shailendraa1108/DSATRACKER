import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Link, Checkbox, Chip, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchDataFromApi } from "../utils/api";

export default function SubjectsTopics() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchDataFromApi("/subject/get").then((res) => {
      console.log(res);
      setSubjects(res);
    });
  }, []);

  return (
    <Box sx={{ width: "80%", margin: "20px auto" }}>
      {Array.isArray(subjects) &&
        subjects.map((subject) => (
          <Accordion key={subject._id} sx={{ mb: 2, bgcolor: "#00bfff20" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {subject.name}
              </Typography>
              <Chip
                label={subject.status || "Pending"}
                color={subject.status === "Done" ? "success" : "warning"}
                size="small"
              />
            </AccordionSummary>
            <AccordionDetails>
              {subject.topics?.map((topic) => (
                <Box
                  key={topic._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "#f0f8ff",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox checked={topic.status === "Done"} />
                    <Typography>
                      <strong>{topic.name}</strong> - {topic.level}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Link href={topic.leetcode} target="_blank" rel="noopener" underline="hover">
                      LeetCode
                    </Link>
                    <Link href={topic.youtube} target="_blank" rel="noopener" underline="hover">
                      YouTube
                    </Link>
                    <Link href={topic.article} target="_blank" rel="noopener" underline="hover">
                      Article
                    </Link>
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
