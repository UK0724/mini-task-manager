import { executeQuery } from './db-service.js';

const createTask = async (title, description, status, userId) => {
    if (!title || !userId) {
        throw new Error('Title and user ID are required');
    }

    const result = await executeQuery(
        'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
        [title, description || null, Boolean(status), userId]
    );
    
    const [task] = await executeQuery(
        'SELECT * FROM tasks WHERE id = ?', 
        [result.insertId]
    );
    
    return task[0];
};

const getTaskById = async (taskId, userId) => {
    const tasks = await executeQuery(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ? LIMIT 1',
        [taskId, userId]
    );
    return tasks[0] || null;
};

const updateTask = async (taskId, updates, userId) => {
    if (!taskId || !userId) {
        throw new Error('Task ID and user ID are required');
    }

    const { title, description, status } = updates;
    const queryParts = [];
    const params = [];

    if (title !== undefined) {
        if (!title.trim()) {
            throw new Error('Title cannot be empty');
        }
        queryParts.push('title = ?');
        params.push(title);
    }
    
    if (description !== undefined) {
        queryParts.push('description = ?');
        params.push(description);
    }
    
    if (status !== undefined) {
        queryParts.push('status = ?');
        params.push(Boolean(status));
    }

    if (queryParts.length === 0) {
        return null;
    }

    params.push(taskId, userId);
    
    const result = await executeQuery(
        `UPDATE tasks SET ${queryParts.join(', ')} WHERE id = ? AND user_id = ?`,
        params
    );

    if (result.affectedRows === 0) {
        return null;
    }
    return getTaskById(taskId, userId);
};

const deleteTask = async (taskId, userId) => {
    const result = await executeQuery(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
    );
    
    return result.affectedRows > 0;
};

const getUserTasks = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    
    const tasks = await executeQuery(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    
    return tasks;
};

const getTasksByStatus = async (userId, status) => {
    if (userId === undefined || status === undefined) {
        throw new Error('User ID and status are required');
    }
    
    const tasks = await executeQuery(
        'SELECT * FROM tasks WHERE user_id = ? AND status = ? ORDER BY created_at DESC',
        [userId, Boolean(status)]
    );
    
    return tasks;
};

const getTaskCounts = async (userId) => {
    const counts = await executeQuery(
        `SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status = true THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = false OR status IS NULL THEN 1 ELSE 0 END) as pending
        FROM tasks 
        WHERE user_id = ?`,
        [userId]
    );
    
    return counts[0] || { total: 0, completed: 0, pending: 0 };
};

export {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getUserTasks,
    getTasksByStatus,
    getTaskCounts
};