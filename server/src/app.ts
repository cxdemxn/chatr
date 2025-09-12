import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use("/v1/auth", authRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});



export default app;