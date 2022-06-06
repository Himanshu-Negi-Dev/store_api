const express = require("express");
const router = express.Router();

const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/products");

router.get('/', getProducts);
router.post('/create', createProduct);
router.patch('/update', updateProduct);
router.delete('/delete', deleteProduct);

module.exports = router;