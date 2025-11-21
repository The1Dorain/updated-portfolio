import express from "express";

import authMiddleware from "../middlewares/auth.js";
import {
  createQualification,
  deleteQualification,
  getAllQualification,
  getQualificationById,
  updateQualification,
} from "../controllers/qualification.js";

// Router /projects
const router = express.Router();

// HTTP Verbs for RESTful APIs GET, POST, PUT, DELETE
router.get("/", getAllQualification);
router.get("/:id", getQualificationById);
router.post("/", authMiddleware, createQualification);
router.put("/:id", authMiddleware, updateQualification);
router.delete("/:id", authMiddleware, deleteQualification);

export default router;
