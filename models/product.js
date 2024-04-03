const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  asin: String,
  title: String,
  imgUrl: String,
  stars: Number,
  reviews: Number,
  price: Number,
  listPrice: Number,
  categoryName: String,
  isBestSeller: Boolean,
  boughtInLastMonth: Number
});

module.exports = mongoose.model('Product', productSchema);
