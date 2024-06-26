import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    userType: { type: String, enum: ['Donor', 'Receiver'], required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema);