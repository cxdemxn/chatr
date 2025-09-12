import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET as string,
    TRANSLATION_API_KEY: process.env.TRANSLATION_API_KEY,
    LOG_DB_QUERIES: process.env.LOG_DB_QUERIES === 'true',
}