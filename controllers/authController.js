const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Génère un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ✅ Inscription
exports.register = async (req, res) => {
  try {
    const { name, email, password,role  } = req.body;

    // Vérifier champs
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    // Vérifier si utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Créer utilisateur
    const user = await User.create({ name, email, password, role });

    // Générer token
    const token = generateToken(user);

    // Répondre
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Erreur register:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier champs
    if (!email || !password) {
      return res.status(400).json({ message: 'Champs manquants' });
    }

    // Vérifier si utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }

    // Vérifier mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe invalide' });
    }

    // Générer token
    const token = generateToken(user);

    // Répondre
    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Erreur login:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
