
const express = require("express");
require { getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

// GET USER
router.get("/find/:userId", getUser);

// UPDATE USER
router.put("/", updateUser);

export default router;
