const express = require('express');         
const mongoose = require('mongoose');     
const dotenv = require('dotenv');           // Pour lire les variables d'environnement (.env)
const cors = require('cors');               // Permet d'autoriser les requêtes d'autres domaines (CORS)
const morgan = require('morgan');           // Affiche les requêtes dans la console (utile en dev)
const tasksRouter = require('./routes/tasks'); // chemin vers le fichier tasks.js
const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const taskRoutes = require('./routes/tasks');
const allteams = require('./routes/teams');
dotenv.config();
const authRoutes = require('./routes/auth');// On importe les routes d'authentification

// On importe le middleware pour protéger certaines routes
const { protect } = require('./middlewares/auth');

// On crée l'application Express
const app = express();

// Middleware : permet à l'application de comprendre les requêtes JSON
app.use(cors());                  // Autorise toutes les origines (utile en développement)
app.use(express.json());


// On connecte les routes 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/allteams', allteams);


// Si on est en développement, on active morgan pour voir les requêtes HTTP dans la console
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,         // Option pour éviter des avertissements
  useUnifiedTopology: true      // Idem
})
.then(() => console.log('✔️  MongoDB connecté'))  // Si la connexion réussit
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB :', err.message); // Si la connexion échoue
  process.exit(1);  // On arrête le serveur
});

// Routes des tâches
app.use('/api/tasks', tasksRouter);

// Route temporaire
app.get('/api/test/protected', (req, res) => {
  res.json({
    message: 'Accès autorisé, route non protégée',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

// Gestion des erreurs générales (si une route échoue ou génère une erreur)
app.use((err, req, res, next) => {
  console.error(err);  // Affiche l’erreur dans la console
  res.status(err.status || 500).json({ message: err.message || 'Erreur serveur' });
});

// Lancement du serveur sur le port défini dans .env ou 5000 par défaut
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
