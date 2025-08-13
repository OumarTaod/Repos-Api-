API – Gestion des Tâches d'une Équipe
🚀 Présentation
Cette API permet de gérer des utilisateurs, des équipes, et des tâches.
Fonctionnalités principales :

Authentification (JWT)

Rôles utilisateurs : admin / membre

Création et gestion d’équipes

Attribution et suivi de tâches

Filtres, pagination

Sécurité : middleware d’authentification et rôles

Déploiement prêt (MongoDB Atlas + Render)

🔧 Technologies utilisées
Node.js + Express.js

MongoDB + Mongoose

JSON Web Token (JWT)

bcryptjs

Dotenv

Render (déploiement)

🧪 Installation locale
bash
Copier
Modifier
git clone https://github.com/<ton_utilisateur>/gestion-taches-api.git
cd gestion-taches-api
npm install
Créer un fichier .env à la racine avec les variables :

env
Copier
Modifier
PORT=5000
MONGO_URI=<url_mongodb_atlas>
JWT_SECRET=tonSecretJWT
Lancer le serveur :

bash
Copier
Modifier
node server.js
🔐 Authentification
POST /api/auth/register
Créer un compte utilisateur

Body :

json
Copier
Modifier
{
  "name": "Alpha",
  "email": "alpha@example.com",
  "password": "MotDePasse123"
}
Retour : JWT token

POST /api/auth/login
Connexion d’un utilisateur

json
Copier
Modifier
{
  "email": "alpha@example.com",
  "password": "MotDePasse123"
}
Retour :

json
Copier
Modifier
{
  "token": "..."
}
👤 Utilisateurs
GET /api/users
Lister tous les utilisateurs (admin uniquement)

Header :

makefile
Copier
Modifier
Authorization: Bearer <token_admin>
Retour : tableau d’utilisateurs

🧑‍🤝‍🧑 Équipes
POST /api/teams
Créer une équipe (admin uniquement)

json
Copier
Modifier
{
  "name": "Équipe Test",
  "description": "Projet Final Node"
}
PUT /api/teams/:id/addMember
Ajouter un membre dans l’équipe (admin uniquement)

json
Copier
Modifier
{
  "memberId": "ID_DU_MEMBRE"
}
GET /api/teams
Lister toutes les équipes (utilisateurs connectés)

GET /api/teams/:id
Voir les détails d’une équipe

✅ Tâches
POST /api/tasks
Créer une tâche

json
Copier
Modifier
{
  "title": "Corriger le code",
  "description": "Revoir les erreurs",
  "priority": "haute",
  "status": "en cours",
  "assignedTo": "id_utilisateur",
  "createdBy": "id_utilisateur"
}
PUT /api/tasks/:id
Modifier une tâche existante

json
Copier
Modifier
{
  "status": "terminée"
}
DELETE /api/tasks/:id
Supprimer une tâche

GET /api/tasks
Lister les tâches avec filtres et pagination :

/api/tasks?page=1&limit=10

/api/tasks?status=terminée

/api/tasks?priority=haute&status=en cours

🔒 Middlewares
protect : vérifie que l'utilisateur est connecté (JWT)

isAdmin : vérifie si l'utilisateur est un admin

🌐 Déploiement
MongoDB hébergé sur MongoDB Atlas

API déployée sur Render.com

Variables d’environnement configurées dans Render

📦 Structure du projet
bash
Copier
Modifier
.
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .env
├── .gitignore
└── server.js
✅ À faire pour tester
Créer un compte admin (register)

Se connecter pour obtenir le token

Créer une équipe

Ajouter des membres

Créer des tâches, les assigner

Filtrer, modifier, supprimer

Tester les restrictions d’accès
priority : filtre par priorité (ex. ?priority=haute)

status : filtre par statut (ex. ?status=en_cours)

🧪 Exemple :

bash
Copier
Modifier
GET /api/tasks?page=1&limit=5&priority=haute&status=terminée
🧪 Test simple (public)
Méthode	URL	Description
GET	/api/test/protected	Vérifie que le backend fonctionne