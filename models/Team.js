const mongoose = require('mongoose');

// Définition du schéma de l'équipe
const teamSchema = new mongoose.Schema({
  // Nom de l’équipe (obligatoire)
  name: {
    type: String,
    required: true,
    trim: true // Supprime les espaces au début/fin
  },

  // Description facultative de l’équipe
  description: {
    type: String
  },

  // Tableau d’ID d’utilisateurs qui sont membres de l’équipe
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Référence vers le modèle User
    }
  ],

  // Utilisateur qui a créé cette équipe (obligatoire)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence vers le créateur
    required: true
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Export du modèle Team
module.exports = mongoose.model('Team', teamSchema);
