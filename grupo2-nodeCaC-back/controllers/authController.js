const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config'); //para importar la configuración : clave sevreta y duración


// Función para registrar un nuevo usuario


exports.register = async (req, res) => {
  const { username, email, password } = req.body;


  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Ese email ya está en uso' });
    }


    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);


    // Crear un nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });


    // Generar un token JWT
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, config.secretKey, { expiresIn: '1h' });


    // Enviar el token JWT al cliente
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      },
      token
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


 
  // Función para iniciar sesión
  exports.login = async (req, res) => {
    const { email, password } = req.body;
 
    try {
      // Encontrar el usuario por email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
 
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }
 
      // Crear un token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, config.secretKey, { expiresIn: '1h' });
 
      res.status(200).json({ message: 'Registro exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };
