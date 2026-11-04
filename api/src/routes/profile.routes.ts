import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  const subject = req.auth?.payload.sub;

  if (typeof subject !== "string") {
    return res.status(401).json({
      message: "Invalid authentication token",
    });
  }

  res.status(200).json({
    id: subject,
  });
});

export default router;
