const mongoose = require('mongoose');

/* ── No bcrypt in the model at all — hashing done in routes ── */
const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isAdmin:  { type: Boolean, default: false },
    avatar:   { type: String, default: '' },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty:     { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;