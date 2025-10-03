import { Router } from "express";
import { createTask, deleteTask, getTasks, getTasksByStatus, updateTask } from "../controllers/task-controller.js";

const router = Router();

router.get("/", getTasks); 

router.get("/gettasks/:status", getTasksByStatus); 

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
