const {Router} = require('express');
const router = new Router();
const usuarioController = require('../controllers/userController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')



router.post('/signup', 
[
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6})
],
usuarioController.crearUsuario)

router.put('/profile/edit',
  auth,
  usuarioController.editProfile
)


router.get('/profile/:id', 
  auth,
  usuarioController.getProfile
);

router.put('/profile/:id', 
  auth,
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
  ],
  usuarioController.updateProfile
)

router.delete('/profile/:id/', 
  auth,
  usuarioController.deleteProfile
);

module.exports = router