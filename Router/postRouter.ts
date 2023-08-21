import express from "express"
import {image} from "../utils/multer"
import {createPost} from "../Controller/postController"

const router = express.Router()

router.route("/:userID/create-post").post(image, createPost)

export default router;