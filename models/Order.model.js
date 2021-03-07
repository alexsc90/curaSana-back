const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  products: Array,
  total: Number
},
{
  timeStamps: true
}
)

const Order = model('Order', orderSchema)
module.exports = Order; 