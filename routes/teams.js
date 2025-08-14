const express = require('express');
const router = express.Router();
const { teamSchema } = require('../validators/team.schema');
const validate = require('../middlewares/validate');

const {
  createTeam,
  addMember,
  getTeamById,
  getAllTeams
} = require('../controllers/teamController');

const { protect, isAdmin } = require('../middlewares/auth');

// Certaines routes sont protégées (utilisateur connecté obligatoire) et pour admin seulement
router.post('/', protect, isAdmin,validate(teamSchema), createTeam); // Créer une nouvelle équipe
router.put('/:id/addMember', protect, isAdmin,validate(teamSchema), addMember); // Ajouter un membre à une équipe
router.get('/:id', getTeamById); // Voir les détails d’une équipe
router.get('/', protect, isAdmin , getAllTeams); // accessible à tout utilisateur connecté
module.exports = router;
