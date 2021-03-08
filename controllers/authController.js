const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req,res) => {

  const errores = validationResult(req)
  console.log(errores)

  if(!errores.isEmpty()) {
    return res.status(400).json({errores: errores.array()})
  }

  const {email, password} = req.body

  if(email === "" || password === "") {
    res.json({msg: 'Ingresa email y contraseña para iniciar sesión.'})
    return;
  }

  try {
    let usuario = await User.findOne({email})
    console.log("obteniendo usuario:", usuario)

    if(!usuario) {
      return res.status(400).json({msg: 'Usuario no encontrado'})
    }

    const passCorrecto = await bcrypt.compare(password, usuario.password)

    if(!passCorrecto) {
      return await res.status(400).json({msg: "Contraseña incorrecta"})
    }

    const payload = {
      usuario: {
        id: usuario.id
      }
    }

    jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 36000
    }, (error, token) => {
      if(error) throw error

      console.log(token)
      res.json({token})
    })
  } catch (error) {
    console.log(error)
  }
}

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-password')
    console.log('usuario:', usuario)
    res.json({usuario})
  } catch(error) {
    console.log(error)
    res.status(500).json({msg: 'Hubo un error'})
  }
}