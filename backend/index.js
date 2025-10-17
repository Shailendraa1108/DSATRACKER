// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import authRoutes from "./route/routes.js";
import connectDB from "./config/connectDb.js";
import userProgressRoutes from "./route/progressRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/user", authRoutes);
app.use("/api", userProgressRoutes);
export const subjectsWithTopics = [
  {
    name: "Algorithms",
    topics: [
      { name: "Sorting Algorithms", leetcode: "https://leetcode.com/tag/sorting", youtube: "https://youtu.be/1jCFUv-Xlqo?si=7AXtNOM5wdrVEKQs", article: "#", level: "EASY", status: "Done" },
      { name: "Searching Algorithms", leetcode: "https://leetcode.com/problemset", youtube: "https://youtu.be/TbbSJrY5GqQ?si=llAEhm408mGnHv30", article: "#", level: "EASY", status: "Pending" },
      { name: "Dynamic Programming", leetcode: "https://leetcode.com/tag/dynamic-programming", youtube: "https://youtu.be/-g_xhI_tZfA?si=HEjApN2To1Y0v_C_", article: "#", level: "MEDIUM", status: "Pending" },
      { name: "Greedy Algorithms", leetcode: "https://leetcode.com/tag/greedy", youtube: "https://youtu.be/bDPtZO_Skyc?si=RZ9eBoZBJb-veoxh", article: "#", level: "MEDIUM", status: "Pending" },
      { name: "Divide and Conquer", leetcode: "https://leetcode.com/tag/divide-and-conquer", youtube: "https://youtu.be/I8w2XN0w-fQ?si=6RL1CH8Sx6YmsWXr", article: "#", level: "MEDIUM", status: "Done" },
      { name: "Backtracking", leetcode: "https://leetcode.com/tag/backtracking", youtube: "https://youtu.be/pNzljlzDCiI?si=UpVx6CKSRfh6sqDT", article: "#", level: "HARD", status: "Pending" },
    ],
  },
 {
  name: "Data Structures",
  topics: [
    { 
      name: "Linked List", 
      leetcode: "https://leetcode.com/tag/linked-list/", 
      youtube: "https://www.youtube.com/watch?v=njTh_OwMljA", 
      article: "https://www.geeksforgeeks.org/data-structures/linked-list/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Stacks & Queues", 
      leetcode: "https://leetcode.com/tag/stack/", 
      youtube: "https://www.youtube.com/watch?v=wjI1WNcIntg", 
      article: "https://www.geeksforgeeks.org/stack-data-structure/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Binary Tree", 
      leetcode: "https://leetcode.com/tag/binary-tree/", 
      youtube: "https://www.youtube.com/watch?v=oSWTXtMglKE", 
      article: "https://www.geeksforgeeks.org/binary-tree-data-structure/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Graphs", 
      leetcode: "https://leetcode.com/tag/graph/", 
      youtube: "https://www.youtube.com/watch?v=gXgEDyodOJU", 
      article: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", 
      level: "HARD", 
      status: "Pending" 
    },
    { 
      name: "Heap", 
      leetcode: "https://leetcode.com/tag/heap/", 
      youtube: "https://www.youtube.com/watch?v=t0Cq6tVNRBA", 
      article: "https://www.geeksforgeeks.org/heap-data-structure/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Hashing", 
      leetcode: "https://leetcode.com/tag/hash-table/", 
      youtube: "https://www.youtube.com/watch?v=shs0KM3wKv8", 
      article: "https://www.geeksforgeeks.org/hashing-data-structure/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
  ],
}
,
 {
  name: "Databases",
  topics: [
    { 
      name: "SQL Basics", 
      leetcode: "https://leetcode.com/tag/sql/", 
      youtube: "https://www.youtube.com/watch?v=HXV3zeQKqGY", 
      article: "https://www.geeksforgeeks.org/sql-tutorial/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Joins", 
      leetcode: "https://leetcode.com/problemset/database/", 
      youtube: "https://www.youtube.com/watch?v=9yeOJ0ZMUYw", 
      article: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Indexes", 
      leetcode: "https://leetcode.com/problemset/database/", 
      youtube: "https://www.youtube.com/watch?v=ZbybYvcVL2c", 
      article: "https://www.geeksforgeeks.org/database-indexing-types/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Normalization", 
      leetcode: "https://leetcode.com/problemset/database/", 
      youtube: "https://www.youtube.com/watch?v=UrYLYV7WSHM", 
      article: "https://www.geeksforgeeks.org/database-normalization/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
  ],
}
,
 {
  name: "Machine Learning",
  topics: [
    { 
      name: "Linear Regression", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=E5RjzSK0fvY", 
      article: "https://www.geeksforgeeks.org/linear-regression/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Logistic Regression", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=yIYKR4sgzI8", 
      article: "https://www.geeksforgeeks.org/logistic-regression/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Decision Trees", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=7VeUPuFGJHk", 
      article: "https://www.geeksforgeeks.org/decision-tree/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Random Forest", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", 
      article: "https://www.geeksforgeeks.org/random-forest/", 
      level: "HARD", 
      status: "Pending" 
    },
  ],
}
,
 {
  name: "Operating System",
  topics: [
    { 
      name: "Processes", 
      leetcode: "#", // No direct LeetCode problem
      youtube: "https://www.youtube.com/watch?v=5Zg-C8AAIGg", 
      article: "https://www.geeksforgeeks.org/processes-in-operating-system/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Threads", 
      leetcode: "https://leetcode.com/problems/print-in-order/", // Thread/order simulation
      youtube: "https://www.youtube.com/watch?v=8rNzxD_vu8M", 
      article: "https://www.geeksforgeeks.org/multithreading-in-java/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Memory Management", 
      leetcode: "https://leetcode.com/problems/allocate-mailboxes/", // Closest memory allocation problem
      youtube: "https://www.youtube.com/watch?v=YBO0x6jRj2Y", 
      article: "https://www.geeksforgeeks.org/memory-management-in-operating-system/", 
      level: "HARD", 
      status: "Pending" 
    },
    { 
      name: "File Systems", 
      leetcode: "https://leetcode.com/problems/design-in-memory-file-system/", // Directly file system design
      youtube: "https://www.youtube.com/watch?v=oKc-Cv4Fizk", 
      article: "https://www.geeksforgeeks.org/file-system-in-operating-system/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
  ],
}
,
{
  name: "Networks",
  topics: [
    { 
      name: "OSI Model", 
      leetcode: "https://leetcode.com/tag/osi-model/", 
      youtube: "https://www.youtube.com/watch?v=vv4y_uOneC0", 
      article: "https://www.geeksforgeeks.org/layers-of-osi-model/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "TCP/IP", 
      leetcode: "https://leetcode.com/tag/tcp-ip/", 
      youtube: "https://www.youtube.com/watch?v=4d69oYBvWbM", 
      article: "https://www.geeksforgeeks.org/tcp-ip-model/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "DNS & DHCP", 
      leetcode: "https://leetcode.com/tag/dns/", 
      youtube: "https://www.youtube.com/watch?v=suZJgLaKrrk", 
      article: "https://www.cloudflare.com/learning/dns/what-is-dns/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Routing & Switching", 
      leetcode: "https://leetcode.com/tag/network-routing/", 
      youtube: "https://www.youtube.com/watch?v=5c_D0luhgL4", 
      article: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-routing-and-switching.html", 
      level: "HARD", 
      status: "Pending" 
    },
  ],
}
,
 {
  name: "Mathematics",
  topics: [
    { 
      name: "Probability", 
      leetcode: "https://leetcode.com/tag/probability/", 
      youtube: "https://www.youtube.com/watch?v=UZi6w8-lYV0", 
      article: "https://www.khanacademy.org/math/statistics-probability/probability-library", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Linear Algebra", 
      leetcode: "https://leetcode.com/tag/linear-algebra/", 
      youtube: "https://www.youtube.com/watch?v=kjBOesZCoqc", 
      article: "https://www.khanacademy.org/math/linear-algebra", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Calculus", 
      leetcode: "https://leetcode.com/tag/calculus/", 
      youtube: "https://www.youtube.com/watch?v=WUvTyaaNkzM", 
      article: "https://www.khanacademy.org/math/calculus-1", 
      level: "HARD", 
      status: "Pending" 
    },
    { 
      name: "Statistics", 
      leetcode: "https://leetcode.com/tag/statistics/", 
      youtube: "https://www.youtube.com/watch?v=Vfo5le26IhY", 
      article: "https://www.khanacademy.org/math/statistics-probability", 
      level: "MEDIUM", 
      status: "Pending" 
    },
  ],
}
,
{
  name: "Software Engineering",
  topics: [
    { 
      name: "SDLC Models", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=9dG3ZtU-68s", 
      article: "https://www.geeksforgeeks.org/software-engineering-software-development-life-cycle-sdlc/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Agile Methodology", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=Z9QbYZh1YXY", 
      article: "https://www.atlassian.com/agile", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "UML Diagrams", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=OkSu_6eIQ4g", 
      article: "https://www.uml-diagrams.org/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Software Testing", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=DLh7kT5pK4U", 
      article: "https://www.guru99.com/software-testing.html", 
      level: "MEDIUM", 
      status: "Pending" 
    },
  ],
}
,
{
  name: "Web Development",
  topics: [
    { 
      name: "HTML & CSS", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=UB1O30fR-EE", 
      article: "https://developer.mozilla.org/en-US/docs/Learn/HTML", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "JavaScript", 
      leetcode: "https://leetcode.com/problemset/all/?difficulty=Easy&tags=javascript", 
      youtube: "https://www.youtube.com/watch?v=W6NZfCO5SIk", 
      article: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "ReactJS", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=bMknfKXIFA8", 
      article: "https://reactjs.org/docs/getting-started.html", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "NodeJS", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=Oe421EPjeBE", 
      article: "https://nodejs.org/en/docs/guides/", 
      level: "MEDIUM", 
      status: "Pending" 
    },
  ],
}
,
 {
  name: "Cloud Computing",
  topics: [
    { 
      name: "AWS Basics", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=ulprqHHWlng", 
      article: "https://aws.amazon.com/getting-started/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Azure Basics", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=qnOgI_P2w3Y", 
      article: "https://learn.microsoft.com/en-us/training/azure/", 
      level: "EASY", 
      status: "Pending" 
    },
    { 
      name: "Google Cloud Platform", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=K2dvKfScJH4", 
      article: "https://cloud.google.com/training", 
      level: "MEDIUM", 
      status: "Pending" 
    },
    { 
      name: "Cloud Security", 
      leetcode: "#", 
      youtube: "https://www.youtube.com/watch?v=E0ni1jX96qU", 
      article: "https://www.coursera.org/learn/cloud-security", 
      level: "HARD", 
      status: "Pending" 
    },
  ],
}

];


app.get("/api/subjects", (req, res) => {
  res.json(subjectsWithTopics);
});

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${process.env.PORT || 4500}` });
});

const server = http.createServer(app);

const PORT = process.env.PORT || 4500;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
