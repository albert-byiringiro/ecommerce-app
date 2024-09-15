import express from "express"
import * as itemController from '../controllers/itemController.js'

const router = express.Router()

router.get('/', itemController.getAllItems)

router.get('/:id', itemController.getItemById)

router.post('/', itemController.createItem)


export default router