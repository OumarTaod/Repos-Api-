const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // cette ligne me permet de sécuriser le mot de passe




const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // un email = un seul utilisateur
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['member', 'admin'], // soit "member" soit "admin"
    default: 'member'
  }
}, {
  timestamps: true // ajoute automatiquement createdAt et updatedAt
});






userSchema.pre('save', async function (next) {
  // Si le mot de passe n’a pas été modifié (ex : mise à jour du nom), on continue
  if (!this.isModified('password')) return next();

  // Sinon, on chiffre le mot de passe avant de l’enregistrer
  const salt = await bcrypt.genSalt(10);             // On génère un "sel" de sécurité
  this.password = await bcrypt.hash(this.password, salt);  // On chiffre le mot de passe
  next();  // On passe à l'étape suivante (enregistrement dans la base)
});






userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

//💡 Ça permet, au moment du login, de comparer le mot de passe que l'utilisateur entre
//  avec le mot de passe chiffré enregistré dans la base.



module.exports = mongoose.model('User', userSchema);

