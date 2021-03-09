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

exports.getProfile = async (req, res) => {
  try {
    
    const profile = await User.findById(req.params.id).populate('orders')

    if(!profile) {
    return res.status(404).json({msg: 'Usuario no encontrado'})
    }

    res.status(200).json({profile})
  
  } catch(error) {
    console.log(error)
  }
}

exports.updateProfile = async (req, res) => {
  const errores = validationResult(req)
  if(!errores.isEmpty()) {
    return res.status(400).json({erores: errores.array()})
  }

  const {name, email, phoneNumber} = req.body
  const newProfile = {}

  if(name && email) {
    newProfile.name = name
    newProfile.email = email
    newProfile.phoneNumber = phoneNumber
  }

  try {
    let profile = await User.findById(req.params.id)

    if(!profile) {
      return res.status(400).json({msg: 'Usuario no encontrado'})
    }

    profile = await User.findByIdAndUpdate({_id: req.params.id.toString()}, {$set: newProfile}, {new: true} )
    res.json({profile})

  } catch(error) {
    console.log(error)
  }
}

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id)

    if(!profile) {
      return res.status(404).json({msg: 'Usuario no encontrado'})
    }

    await User.findOneAndRemove({_id: req.params.id})

    res.json({msg: 'Usuario eliminado:', profile})
  } catch(error) {
    console.log(error)
    res.status(500).send('Error en el servidor')
  }
}