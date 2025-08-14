const Joi = require('joi');

// Schéma pour l'inscription
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required()
    .messages({
      'string.empty': 'Le nom est obligatoire',
      'string.min': 'Le nom doit contenir au moins 3 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'L’email est obligatoire',
      'string.email': 'L’email doit être valide'
    }),
  password: Joi.string().min(3).required()
    .messages({
      'string.empty': 'Le mot de passe est obligatoire',
      'string.min': 'Le mot de passe doit contenir au moins 3 caractères'
    }),
  role: Joi.string().valid('member', 'admin').optional()
});

// Schéma pour la connexion
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'L’email est obligatoire',
    'string.email': "L'email doit être valide"
  }),
  password: Joi.string().required().messages({
      'string.empty': 'Le mot de passe est obligatoire',
    }),
});

module.exports = {
  registerSchema,
  loginSchema
};

// Schéma pour 