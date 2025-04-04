const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectToDatabase = require("../config/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const groupRoutes = require("./routes/group");
const groupMembershipRoutes = require("./routes/groups/members");
const groupCategoryRoutes = require("./routes/groups/categories");
const categoryQuestionRoutes = require("./routes/categories/questions");
const groupQuizRoutes = require("./routes/groups/quizzes");
const quizRoutes = require("./routes/quiz");
const quizSubmissionRoutes = require("./routes/quizzes/submissions");
const errorHandler = require("./middlewares/error-handler");
const { NotFoundError } = require("./utils/errors");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Plug shared middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Add routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups/:groupId/members", groupMembershipRoutes);
app.use("/api/groups/:groupId/categories", groupCategoryRoutes);
app.use("/api/categories/:categoryId/questions", categoryQuestionRoutes);
app.use("/api/groups/:groupId/quizzes", groupQuizRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quizzes/:quizId/quiz_submissions", quizSubmissionRoutes);

// Root page
app.get("/", (req, res) => {
  res.send("🚀 Welcome to your Express API!");
});

// Handle unexisting routes with NotFoundError
app.all("*", (req, res, next) => {
  next(new NotFoundError("This route does not exist"));
});

// error handler middleware must be after the routes
app.use(errorHandler);

const startServer = async () => {
  await connectToDatabase();

  try {
    app.listen(process.env.PORT, () => {
      console.log("🚀 Server started on port", process.env.PORT);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
