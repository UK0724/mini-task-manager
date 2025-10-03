import * as taskService from '../services/task-service.js';

const createTask = async (req, res) => {
    const { title, description, status = false } = req.body;
    const userId = req.user?.id;
    
    if (!title) {
        return res.status(400).json({ message: "Title is required", success: false });
    }

    try {
        const task = await taskService.createTask(title, description, status, userId);
        
        res.status(201).json({ 
            message: "Task created successfully", 
            success: true, 
            data: task
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ 
            message: "Error creating task", 
            success: false,
            error: error.message 
        });
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user?.id;
    const updates = req.body;

    if (updates.title !== undefined && !updates.title.trim()) {
        return res.status(400).json({ 
            message: "Title cannot be empty", 
            success: false 
        });
    }

    try {
        const task = await taskService.getTaskById(taskId, userId);
        if (!task) {
            return res.status(404).json({ 
                message: "Task not found or access denied", 
                success: false 
            });
        }

        const updatedTask = await taskService.updateTask(taskId, updates, userId);
        
        if (!updatedTask) {
            return res.status(400).json({ 
                message: "No valid fields to update", 
                success: false 
            });
        }

        res.status(200).json({ 
            message: "Task updated successfully", 
            success: true, 
            data: updatedTask
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ 
            message: "Error updating task", 
            success: false,
            error: error.message 
        });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user?.id;

    try {
        const task = await taskService.getTaskById(taskId, userId);
        if (!task) {
            return res.status(404).json({ 
                message: "Task not found or access denied", 
                success: false 
            });
        }

        await taskService.deleteTask(taskId, userId);
        
        res.status(200).json({ 
            message: "Task deleted successfully", 
            success: true 
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ 
            message: "Error deleting task", 
            success: false,
            error: error.message 
        });
    }
};

const getTasks = async (req, res) => {
    const userId = req.user?.id;

    try {
        const tasks = await taskService.getUserTasks(userId);
        console.log(tasks)
        res.status(200).json({ 
            message: "Tasks fetched successfully", 
            success: true, 
            data: tasks 
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ 
            message: "Error fetching tasks", 
            success: false,
            error: error.message 
        });
    }
};

const getTasksByStatus = async (req, res) => {
    const status = req.params.status === 'true';
    const userId = req.user?.id;

    try {
        const tasks = await taskService.getTasksByStatus(userId, status);
        
        res.status(200).json({
            message: "Tasks fetched successfully", 
            success: true,
            data: tasks
        });
    } catch (error) {
        console.error('Get tasks by status error:', error);
        res.status(500).json({ 
            message: "Error fetching tasks by status", 
            success: false,
            error: error.message 
        });
    }
};

export { createTask, updateTask, deleteTask, getTasks, getTasksByStatus };