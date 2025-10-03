import { connection } from '../utils/connect-db.js';

const executeQuery = async (query, params = []) => {
    try {
        const [results] = await connection.execute(query, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

export { executeQuery };
