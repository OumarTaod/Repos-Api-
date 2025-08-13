const Task = require('../models/Task');

// Afficher les tâches avec pagination et filtres
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {};
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.status) filters.status = req.query.status;

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    const total = await Task.countDocuments(filters);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy: req.user.id, // Récupéré depuis le token grâce au middleware
    });

    await task.save();

    res.status(201).json({ message: 'Tâche créée avec succès', task });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création', error: err.message });
  }
};

// Modifier une tâche
exports.updateTask = async (req, res) => {
  try {
    const updates = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.json({ message: 'Tâche mise à jour', task: updatedTask });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la modification', error: err.message });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Tâche non trouvée' });

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
