import Task from "../models/task-model.js";

const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    
    if (!title) {
        return res.status(400).json({ message: "missing required fields", success: false });
    }

    const task = new Task({
        title,
        description,
        ...(status && { status }),
        user: req.user?.id,
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully", success: true, data: task });
}

const updateTask = async(req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }
        
        if (String(task.user) !== String(req.user?.id)) {
            return res.status(403).json({ message: "Forbidden", success: false });
        }

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({ message: "Title cannot be empty", success: false });
            }
            task.title = title;
        }
        
        if (status !== undefined) {
            task.status = status;
        }

        await task.save();
        res.status(200).json({ 
            message: "Task updated successfully", 
            success: true, 
            data: task 
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ 
            message: "Error updating task", 
            success: false,
            error: error.message 
        });
    }
}

const deleteTask = async(req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: "Task not found", success: false });
    }
    if (String(task.user) !== String(req.user?.id)) {
        return res.status(403).json({ message: "Forbidden", success: false });
    }
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully", success: true });
}

const getTasks = async(req, res) => {
    const tasks = await Task.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Tasks fetched successfully", success: true, data: tasks });
}

export {createTask, updateTask, deleteTask, getTasks}