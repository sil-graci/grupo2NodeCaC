const jwt = require('jsonwebtoken');
const config = require('../config/config');  


module.exports = (req, res, next) => {
  // Obtener el token de los encabezados de la solicitud
  const authHeader = req.headers['authorization'];


  // Verificar si se proporcionó el encabezado de autorización
  if (!authHeader) {
    return res.status(401).json({ auth: false, message: 'No se proveyó un token' });
  }


  // Extraer el token del encabezado de autorización
  const token = authHeader.split(' ')[1];


  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No se proveyó un token' });
  }


  // Verificar y decodificar el token
  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ auth: false, message: 'Token inválido' });
    }


    // Almacenar el ID del usuario en el objeto de solicitud
    req.user = { id: user.id, username: user.username };
    next(); // Continuar con la solicitud


  });
};
