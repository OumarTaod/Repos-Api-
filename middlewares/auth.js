const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non autorisé, token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur introuvable' });
    }
    req.user = user; // On stocke l'utilisateur dans req pour la suite
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // continuer si c'est un admin
  } else {
    res.status(403).json({ message: 'Accès refusé : Admin uniquement' });
  }
};

module.exports = {
  protect,
  isAdmin
};

