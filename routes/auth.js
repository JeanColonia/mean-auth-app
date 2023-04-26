const {Router}  = require('express');
const { crearUsuario, login, reloadToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validators');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
//controllers

router.post('/register', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({ min:6}),
  validarCampos
] ,crearUsuario);


router.post('/', [
  check('email','El email es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').isLength({min:6}),
  validarCampos
] ,login)


router.get('/reloadToken', validarJWT, reloadToken);


module.exports = router;