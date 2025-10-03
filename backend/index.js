import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes.js";
import taskRoutes from "./routes/task-routes.js";
import authenticateMiddleware from "./middlewares/authenticate-middleware.js";
import { connectDB } from "./utils/connect-db.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiPrefix = "/api";

app.use(express.json());

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true); // Allow all origins
  },
  credentials: true
}));

app.get(`${apiPrefix}/`, (req, res) => {
    res.send("Hello World!");
});

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/tasks`, authenticateMiddleware, taskRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
