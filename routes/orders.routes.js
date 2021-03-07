const {Router} = require('express');
const router = new Router();
const mongoose = require ('mongoose');
const Order = require('../models/Order.model');

router.get('/pedidos', (req, res, next) => {
  Order.find({})
  .then((orders) => {
    res.json({orders})
  })
  .catch(error => {
    next(error)
  })
});

router.post('/pedidos/crear', (req, res, next) => {
  const {products, total} = req.body

  Order.create({
    products, total
  }).then((order) => {
      res.json(order)
  }).catch((error) => {
    res.json({errorMessage: 'Intenta nuevamente'})
  })
});

router.patch('/pedidos/:id/actualizar', (req, res, next) => {
  const {id} = req.params
  const{products, total} = req.body

  Order.findByIdAndUpdate(id, {products, total}, {new: true})
  .then((order) => {
    res.json(order)
  }).catch(error => next(error))
});

router.delete('/pedidos/:id/eliminar', (req, res, next) => {
  const {id} = req.params

  Order.findByIdAndDelete(id)
  .then(() => {
    res.json({message: 'orden eliminada'})
  }).catch(error => next(error))
});

module.exports = router