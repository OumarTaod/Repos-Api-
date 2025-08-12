const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Middleware pour récupérer toutes les tâches avec pagination, filtrage par priorité et statut
router.get('/', async (req, res) => {
  try {
    // Pagination : page et taille (limit)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Filtres optionnels
    const filters = {};
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.status) filters.status = req.query.status;

    // Calcul du skip pour la pagination
    const skip = (page - 1) * limit;

    // Récupérer les tâches avec filtres, pagination et tri par date création desc
    const tasks = await Task.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email') // On affiche le nom et email de la personne assignée
      .populate('createdBy', 'name email'); // pareil pour le créateur

    // Nombre total pour pagination
    const total = await Task.countDocuments(filters);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
      tasks
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route pour créer une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo, createdBy } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
});

// Route pour modifier une tâche par son id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, status, assignedTo },
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la modification', error: err.message });
  }
});

// Route pour supprimer une tâche par son id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
