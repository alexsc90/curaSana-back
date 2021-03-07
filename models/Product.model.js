const {Schema, model} = require('mongoose')

const productSchema = new Schema({
  name: String,
  flavour: String,
  imageURL: String, 
  price: Number,
  quantity: {type: Number, default: 1},
  measurement: String
})

const Product = model('Product', productSchema);
module.exports = Product;