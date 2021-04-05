const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  products: Array,
  total: Number,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
},
{
  timestamps: true
}
)

const Order = model('Order', orderSchema)
module.exports = Order; 