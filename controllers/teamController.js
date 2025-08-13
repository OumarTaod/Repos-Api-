const Team = require('../models/Team');
const User = require('../models/User');

//  Créer une nouvelle équipe
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newTeam = new Team({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id]
    });

    const savedTeam = await newTeam.save();

    res.status(201).json({
      message: 'Équipe créée avec succès',
      team: savedTeam
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


//  Ajouter un membre existant à une équipe
exports.addMember = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { userId } = req.body;

    // Vérifie que le user à ajouter existe
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Équipe introuvable' });

    // Vérifie que le user n’est pas déjà membre
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: 'Utilisateur déjà membre' });
    }

    team.members.push(userId);
    await team.save();

    res.json({ message: 'Membre ajouté avec succès', team });
  } catch (error) {
    console.error('Erreur addMember:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

//  Voir les détails d’une équipe
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members', 'name email role') // Affiche les infos des membres
      .populate('createdBy', 'name email');

    if (!team) return res.status(404).json({ message: 'Équipe introuvable' });

    res.json({ team });
  } catch (error) {
    console.error('Erreur getTeamById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('members', 'name email role')
      .populate('createdBy', 'name email');

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des équipes', error: err.message });
  }
};
