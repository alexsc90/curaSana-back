const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  products: Array,
  total: Number,
  shippingAddress: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
},
{
  timeStamps: true
}
)

const Order = model('Order', orderSchema)
module.exports = Order; 