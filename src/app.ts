import express from "express";
import cors from "cors";
import emailRoutes from "./routes/email.routes";
import authRoutes from "./routes/auth.routes";
import notificationRoutes from "./routes/notification.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

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
app.use("/api/notifications", notificationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
