📘 API - Gestion des Tâches d’une Équipe
🔐 Authentification
Méthode	URL	Description
POST	/api/auth/register	Enregistrer un nouvel utilisateur
POST	/api/auth/login	Se connecter (retourne un token)

📝 Tâches
Méthode	URL	Description
GET	/api/tasks	Obtenir toutes les tâches (filtrage + pagination)
POST	/api/tasks	Créer une nouvelle tâche
GET	/api/tasks/:id	(optionnel) Obtenir une tâche par son ID
PUT	/api/tasks/:id	Modifier une tâche par son ID
DELETE	/api/tasks/:id	Supprimer une tâche par son ID

🧰 Paramètres pour GET /api/tasks :

page : numéro de page (ex. ?page=2)

limit : nombre de tâches par page (ex. ?limit=5)

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