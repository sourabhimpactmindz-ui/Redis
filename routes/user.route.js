import express from 'express'
import { CreateUser, insertbulkProducts, UserFind } from '../controller/user.controller.js'

const router = express.Router()
router.post("/userbulk",insertbulkProducts)
router.post("/user" , CreateUser)
router.get("/userall" , UserFind)

export default router;