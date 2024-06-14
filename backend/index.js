const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
console.log(process.env);

//users Router
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const email = require('./routes/email')
app.use('/contact',email)
const teacherRouter = require("./routes/teachers");
app.use("/teachers", teacherRouter);

const gradeRouter = require('./routes/grades')
app.use('/grades',gradeRouter)

const subjectRouter = require('./routes/subjects')
app.use('/subjects',subjectRouter)

const materialRouter = require('./routes/materials')
app.use("/materials",materialRouter)


const courseRouter = require('./routes/courses')
app.use('/courses',courseRouter)


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
