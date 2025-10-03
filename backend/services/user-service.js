import { executeQuery } from './db-service.js';

const findUserByEmail = async (email) => {
    const [users] = await executeQuery(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
    );
    return users;
};

const findUserById = async (userId) => {
    const [users] = await executeQuery(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [userId]
    );
    return users;
};

const createUser = async (name, email, hashedPassword) => {
    const result = await executeQuery(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );

    if (!result || !result.insertId) {
        throw new Error('Failed to create user: No insert ID returned');
    }
    
    const user = await findUserById(result.insertId);
    if (!user) {
        throw new Error('Failed to retrieve created user');
    }
    
    return user;
};

export {
    findUserByEmail,
    findUserById,
    createUser
};
