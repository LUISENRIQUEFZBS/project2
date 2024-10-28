const express = require('express');

const usuarioController= require('../controllers/usuario')

const router = express.Router();

router.post('/login', usuarioController.postLogin);
router.post('/logout', usuarioController.postLogout);
router.post('/signup', usuarioController.postSignup);
 
router.get('/login',usuarioController.getLogin);
router.get('/signup', usuarioController.getSignup);

module.exports = router;
