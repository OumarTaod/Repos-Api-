const User = require('../models/User');

// Voir tous les utilisateurs (admin uniquement)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = req.params.id
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    await User.findByIdAndDelete(user);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser
};
