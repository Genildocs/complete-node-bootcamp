const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Um usário deve ter um nome'],
  },
  email: {
    type: String,
    required: [true, 'Um usário deve ter um email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Por favor, insira um email vaálido'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Um usário deve ter uma senha'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Um usário deve confirmar a sua senha'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'As senhas devem ser iguais',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
