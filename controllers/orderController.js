const Order = require('../models/Order.model')
const User = require('../models/User.model')
const {validationResult} = require('express-validator')

exports.allOrders = async (req, res) => {
  const orders = await Order.find({user: usuario._id}).sort({createdAt: -1}).populate('user')
  res.json({orders})
}

exports.createOrder = async (req, res) => {

  const {products, total, usuario} = req.body

  const order = await Order.create({
    products, 
    total,
    user: usuario._id
  })

  const usuarioActualizado = await User.findByIdAndUpdate(usuario._id, {$addToSet: {orders: order._id}}, {new: true}).populate('orders')


  /* const errores = validationResult(req)
  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
  }

  try{
    const order = new Order(req.body)

    order.user = req.usuario.id

    await order.save()

    const usuarioActualizado = await User.findByIdAndUpdate(req.usuario.id, {$addToSet: {orders: order._id}}, {new: true}).populate('orders')
    console.log(usuarioActualizado)
    
    res.json(order)

  } catch(error) {
    console.log(error)
    res.status(500).send('Hubo un error')
  } */

}

exports.orderDetails = async (req,res) => {
  const id = req.params.id
  const order = await Order.findById(id).populate('user')
  res.json(order)
}

exports.updateOrder = async (req, res) => {
  const errores = validationResult(req)
  if(!errores.isEmpty()) {
    return res.status(400).json({erores: errores.array()})
  }
  
  const{products, total, shippingAddress} = req.body

  const newOrder = {}

  if(products) {
    newOrder.products = products
    newOrder.total = total
    newOrder.shippingAddress = shippingAddress
  }

  try {
    let order = await Order.findById(req.params.id)

    if(!order) {
      return res.status(400).json({msg: 'Pedido no encontrado'})
    }

    if(order.user.toString() !== req.usuario.id) {
      return res.status(400).json({msg: 'No autorizado'})
    }

    order = await Order.findByIdAndUpdate({_id: req.params.id.toString()}, {$set: newOrder}, {new: true} )
    res.json({order})
  } catch(error) {
    console.log(error)
  }

}

exports.deleteOrder = async (req, res) => {

  try {
  const order = await Order.findById(req.params.id)

  if(!order) {
    return res.status(404).json({msg: 'Pedido no encontrado'})
  }

  if(order.user.toString() !== req.usuario.id){
    return res.status(401).json({msg: 'Usuario no autorizado'})
  }

  await Order.findOneAndRemove({_id: req.params.id})

  res.json({msg: 'Pedido elimindado:', order})
  } catch(error) {
    console.log(error)
    res.status(500).send('Error en el servidor')
  }
}