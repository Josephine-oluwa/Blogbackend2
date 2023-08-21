import express from "express"

import { createAuth, getAuth, getOneAuth, signInAuth } from "../Controller/AuthController"
import { upload } from "../utils/multer";

const router = express.Router();

router.route("/create").post(upload, createAuth);
router.route("/get").get(getAuth)
router.route("/:authID/read").get(getOneAuth)
router.route("/sign-in").post(signInAuth)

export default router