const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Socket
const http = require('http');
const socketIo = require('socket.io');
const { handleSocketConnection } = require('./controllers/Chat');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://learnolearning.netlify.app"],
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => handleSocketConnection(socket, io));

app.use(express.json());

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://learnolearning.netlify.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/password", require("./routes/recovery"));

// Stripe
app.use('/create-payment-intent', require("./routes/stripe"));

// Users Router
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const ChatRouter = require("./routes/Chat");
app.use("/chat", ChatRouter);

const email = require('./routes/email');
app.use('/contact', email);

const teacherRouter = require("./routes/teachers");
app.use("/teachers", teacherRouter);

const gradeRouter = require('./routes/grades');
app.use('/grades', gradeRouter);

const subjectRouter = require('./routes/subjects');
app.use('/subjects', subjectRouter);

const materialRouter = require('./routes/materials');
app.use("/materials", materialRouter);

const courseRouter = require('./routes/courses');
app.use('/courses', courseRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
