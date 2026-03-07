import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseUid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String, default: '' },
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
    age: { type: Number },
    location: { type: String },
    phone: { type: String },
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);
