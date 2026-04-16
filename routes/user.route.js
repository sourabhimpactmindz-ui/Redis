import express from 'express'
import { CreateUser, insertbulkProducts, UserFind } from '../controller/user.controller.js'
import { Createuser } from '../controller/mailer.controller.js'
import Uploads from '../config/multer.js'
import { CreateUserImage } from '../controller/cloud.image.js'

const router = express.Router()
router.post("/userbulk",insertbulkProducts)
router.post("/user" , CreateUser)
router.post("/usermail" , Createuser)
router.post("/userimage" , Uploads.single("image") , CreateUserImage)
router.get("/userall" , UserFind)

export default router;