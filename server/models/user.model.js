const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const userSchemaObject = {
    email: String,
    password: String,
    hash: String,
    salt: String
};

const userSchema = new mongoose.Schema(userSchemaObject);

userSchema.methods.setPassword = function (password) {
    this.salt = bcrypt.genSaltSync(16).toString('hex');
    this.hash = bcrypt.hashSync(password, this.salt, null);
};

userSchema.methods.validatePassword = function (password) {
    console.log()
    this.salt = bcrypt.genSaltSync(16).toString('hex');
    // const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    // return this.hash === hash;
    return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('Users', userSchema);

