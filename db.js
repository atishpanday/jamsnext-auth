import { Pool } from 'pg';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
const envFile = environment === 'production' ? '.env.prod' : '.env.dev';

dotenv.config({ path: envFile });

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

export default pool;