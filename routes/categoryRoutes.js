const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.get("/", authMiddleware, categoryController.getAllCategories);
router.post("/", authMiddleware, categoryController.createCategory);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;