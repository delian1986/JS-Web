const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String, required: true },
    lastName: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: [] }],
    profilePicture: { type: mongoose.Schema.Types.String, default: 'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png' },

});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    },

    isAuthor: function (article) {
        if (!article) {
            return false;
        }

        let isAuthor = article.author.equals(this.id);

        return isAuthor;
    },

    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1;
    }

});


const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            username: 'Admin',
            firstName:'Admin',
            lastName:'Admin',
            salt,
            hashedPass,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
