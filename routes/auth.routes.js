const {Router}= require('express')
const router= new Router()
const mongoose= require('mongoose')

const User= require('../models/User.model')

const bcrypt= require('bcrypt')
const saltRounds= 10

router.post('/signup', (req, res, next) => {
  const {name, email, password, phoneNumber, address} = req.body
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if(!regex.test(password)) {
    res.status(500).json({errorMessage: 'La contraseña debe contener al menos 6 chars, un número, una mayúscula y una minúscula.'})
    return;
  }
  if(!name || !email || !password) {
    res.status(500).json({errorMesage: 'Los campos nombre, email y contraseña son obligatorios'})
  }

  bcrypt.genSalt(saltRounds)
  .then(salt => bcrypt.hash(password, salt))
  .then(password => {
    return User.create({
      name, email, password, phoneNumber, address
    })
  })
  .then(user => {
    console.log('Nuevo usuario creado es:', user)
    res.json({message: 'Usuario creado', user})
  })
  .catch(error => {
    if(error instanceof mongoose.Error.ValidationError) {
      res.status(500).json({errorMessage: error.Message})
    } else if(error.code === 1100) {
      res.status(500).json({errorMessage: 'Nombre y correo electrónico deben ser únicos.'})
    } else {
      next(error)
    }
  })
})

router.post('/login', (req, res, next) => {
  const {email, password} = req.body

  if(email === "" || password === "") {
    res.json({errorMessage: 'Ingresa email y contraseña para iniciar sesión.'})
    return;
  }
  User.findOne({email})
    .then(user=> {
      if(!user) {
        res.json({errorMessage: 'Email no registrado, intenta de nuevo.'})
        return;
      } else if(bcrypt.compareSync(password, user.password)) {
        req.session.currentClient = user
        res.json(user);
      } else {
        res.json({errorMessage: 'Contraseña incorrecta, intenta de nuevo.'})
      }
    })
    .catch(error => next(error));
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.json({message: 'Has finalizado sesión.'})
})

module.exports = router