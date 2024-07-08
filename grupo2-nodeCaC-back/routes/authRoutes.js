const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// Ruta para el registro de nuevos usuarios
router.post('/register', authController.register);


// Ruta para el inicio de sesión de usuarios
router.post('/login', authController.login);


// Ruta protegida (requiere autenticación)
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send(`Hola  ${req.user.username}`);


  });




module.exports = router;
