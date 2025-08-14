const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required()
    .messages({
      'string.empty': 'Le titre est obligatoire',
      'string.min': 'Le titre doit contenir au moins 3 caractères',
      'string.max': 'Le titre ne peut pas dépasser 100 caractères'
    }),
  description: Joi.string().max(500).optional()
    .messages({
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    }),
  priority: Joi.string().valid('low', 'medium', 'high').optional()
    .messages({
      'any.only': 'La priorité doit être "low", "medium" ou "high"'
    }),
  status: Joi.string().valid('in progress', 'completed').optional()
    .messages({
      'any.only': 'Le statut doit être "in progress" ou "completed"'
    }),
  assignedTo: Joi.string().length(24).required()
    .messages({
      'string.empty': 'L’ID de la personne assignée est obligatoire',
      'string.length': 'L’ID de l’utilisateur doit contenir 24 caractères'
    }),
  createdBy: Joi.string().length(24).required()
    .messages({
      'string.empty': 'L’ID du créateur est obligatoire',
      'string.length': 'L’ID du créateur doit contenir 24 caractères'
    })
});

module.exports = { taskSchema };
