import express from "express";
import healthRoutes from "./routes/health.routes.js";
import homeRoutes from "./routes/home.routes.js";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/home", homeRoutes);

export default app;
