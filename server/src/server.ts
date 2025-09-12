import server from "./app";
import config from "./config";
import dotenv from "dotenv";
import { initializeDataSource } from "./config/data-source";

dotenv.config();

server.listen(config.PORT, async () => {
    await initializeDataSource();
    console.log(`Server is running on port ${config.PORT}`);
});