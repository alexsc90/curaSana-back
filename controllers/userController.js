const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req)
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if(!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()})
  }

  if(!regex.test(password)) {
    return res.status(500).json({errorMessage: 'La contraseña debe contener al menos 6 chars, un número, una mayúscula y una minúscula.'})
  }

  const {name, email, password, phoneNumber} = req.body

  try {
    let usuario = await User.findOne({email})

    if(usuario) {
      return res.status(400).json({msg: 'El usuario ya existe'})
    }

    usuario = new User(req.body)

    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt)

    await usuario.save()

    const payload = {
      usuario: {
        id: usuario.id
      }
    }

    jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 36000
    }, (error, token) => {
      if(error) throw error

      res.json({token})
    })

  } catch(error) {
    console.log(error)
    res.status(400).send('Hubo un error')
  }
}