import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to Oocak API",
    data: {
      title: "Home",
      description: "Public homepage data",
    },
  });
});

export default router;
