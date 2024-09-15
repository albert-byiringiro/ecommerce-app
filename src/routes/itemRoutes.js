import express from "express"
import * as itemController from '../controllers/itemController.js'

const router = express.Router()

router.get('/', itemController.getAllItems)

router.get('/:id', itemController.getItemById)


export default router