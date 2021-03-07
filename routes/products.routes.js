const {Router} = require('express');
const router = new Router();
const mongoose = require ('mongoose');
const Product = require('../models/Product.model');

router.get('/productos', async (req, res, next) => {
  
   Product.find({}).sort({name: 1})
  .then((products) => {
    res.json({products})
  })
  .catch(error => {
    next(error)
  }) 
})

module.exports = router