const Joi = require('joi');

const teamSchema = Joi.object({
  name: Joi.string().min(3).max(50).required()
    .messages({
      'string.empty': 'Le nom de l’équipe est obligatoire',
      'string.min': 'Le nom doit contenir au moins 3 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères'
    }),
  description: Joi.string().max(200).optional()
    .messages({
      'string.max': 'La description ne peut pas dépasser 200 caractères'
    }),
  members: Joi.array().items(Joi.string().length(24))
    .messages({
      'string.length': 'Chaque ID membre doit contenir 24 caractères'
    }),
  createdBy: Joi.string().length(24).required()
    .messages({
      'string.empty': 'Le créateur de l’équipe est obligatoire',
      'string.length': 'L’ID du créateur doit contenir 24 caractères'
    })
});

module.exports = { teamSchema };
