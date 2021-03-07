const {Router} = require('express');
const router = new Router();
const mongoose = require ('mongoose');

const User = require('../models/User.model');

router.get('/profile', (req, res, next) => {
  console.log(req.session.currentUser)
  req.session.currentUser

  res.json({userInSession: req.session.currentUser})
});

router.patch('/profile/:id/edit', (req, res, next) => {
  const {id} = req.params
  const {name, email, phoneNumber, address} = req.body

  User.findByIdAndUpdate(id, {name, email, phoneNumber, address}, {new: true})
    .then((user) => {
      res.json(user)
    }).catch(error => next(error))
});

router.delete('/profile/:id/eliminar', (req, res, next) => {
  const {id} = req.params
  req.session.destroy()
  
  User.findByIdAndDelete(id)
    .then(() => res.json({message: 'Crea un nuevo perfil'})
    ).catch(error => next(error))
});

module.exports = router