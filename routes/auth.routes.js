const {Router}= require('express')
const router= new Router()
const {check} = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')


router.post('/login', 
  [
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caraceres").isLength({min: 6})
  ], 
  authController.autenticarUsuario
)

router.get('/login',
    auth,
    authController.usuarioAutenticado 
)

module.exports = router 