import express from 'express'
import { addProductController, deleteProductController, editProductController, getAllProductController, getEachProductController } from '../controller/productController'

const router = express.Router()

router.post('/add', addProductController)
router.get('/get/all', getAllProductController)
router.get('/get/each/:id', getEachProductController)
router.put('/edit/:id', editProductController)
router.delete('/delete/:id', deleteProductController)

export default router