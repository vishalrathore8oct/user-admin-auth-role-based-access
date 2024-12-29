const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.comparePassword = async function(password) {
    return await bycrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;