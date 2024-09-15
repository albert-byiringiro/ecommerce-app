import express from "express"
import * as itemController from '../controllers/itemController.js'

const router = express.Router()

router.get('/', itemController.getAllItems)

export default router