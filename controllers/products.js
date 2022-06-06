const { createNewError } = require('../error/custom-error');
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


const updateProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
  const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true, runValidators: true });

  if (!updateProduct) {
    next(createNewError('product not found', 401));
  }

  res.status(200).json({ product: updatedProduct });
});


const deleteProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;

  const deletedProduct = await Product.findOneAndDelete({ _id: productId });
  if (!deletedProduct) {
    createNewError('product not found', 401)
  }

  res.status(200).json({ deletedProduct });
});




const filteredProduct = asyncWrapper(async (req, res) => {
  const { name, price, featured, rating, company, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (numericFilters) {
    const operatorsMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    }

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    const filter = numericFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`);
    const options = ["price", "rating"]
    filter.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: value }
      }
    })
  }


  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products });

})

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, filteredProduct };