const asyncWrapper = require('../middleware/async');
const Product = require('../models/products');

const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
});

const createProduct = asyncWrapper(async (req, res) => {
  const { name, price, featured, rating, createAt, company } = req.body;
  const newProduct = { name, price, featured, rating, createAt, company };
  const createdProduct = await Product.create(newProduct);
  res.status(200).json({ product: createdProduct }); 
});
const updateProduct = (req, res) => {
  res.send('hello from updateProduct');
}

const deleteProduct = (req, res) => {
  res.send('hello from deleteProduct');
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };