const mongoose = require('mongoose');

// Schéma de la tâche
const taskSchema = new mongoose.Schema({
  title: {  // Titre de la tâche
    type: String,
    required: true,
    trim: true
  },
  description: {  // Description optionnelle
    type: String,
    default: ''
  },
  priority: {  // Priorité : faible, moyenne ou élevée
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {  // Statut : en cours ou terminée
    type: String,
    enum: ['En cours..', 'completé✅'],
    default: 'in progress'
  },
  assignedTo: {  // Référence au membre de l’équipe (un User)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Nom du modèle User (ou 'Utilisateur' si tu as gardé ce nom)
    required: true
  },
  createdBy: {  // Qui a créé la tâche (référence User)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Dates de création et modification automatiques
});

// Export du modèle Task
module.exports = mongoose.model('Task', taskSchema);
