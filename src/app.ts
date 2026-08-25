import express from "express";
import cors from "cors";
import emailRoutes from "./routes/email.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "Notification & Email API is running",
    });
});

app.use("/api/emails", emailRoutes);
app.use("/api/auth", authRoutes);

export default app;
