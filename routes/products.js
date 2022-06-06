const express = require("express");
const router = express.Router();

const { getProducts, createProduct, updateProduct, deleteProduct, filteredProduct } = require("../controllers/products");

router.get('/', getProducts);
router.get('/search', filteredProduct);
router.post('/create', createProduct);
router.patch('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;