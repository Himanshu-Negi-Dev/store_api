const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`connected to server at ${PORT}`))
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
start();