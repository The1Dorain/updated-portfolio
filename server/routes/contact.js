import express from "express";

import authMiddleware from "../middlewares/auth.js";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../controllers/contact.js";

// Router /projects
const router = express.Router();

// HTTP Verbs for RESTful APIs GET, POST, PUT, DELETE
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", authMiddleware, createContact);
router.put("/:id", authMiddleware, updateContact);
router.delete("/:id", authMiddleware, deleteContact);

export default router;
