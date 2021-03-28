const {Router} = require('express');
const router = new Router();
const mongoose = require ('mongoose');
const Product = require('../models/Product.model');

router.get('/productos', async (req, res, next) => {
  
  const products = await Product.find({}).sort({name: 1})
  res.status(200).json({products})
})

router.get('/productos/:id', async (req, res, next) => {
  const id = req.params.id
  const product = await Product.findById(id)
  res.json(product)
})

module.exports = router