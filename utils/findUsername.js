const { User } = require('../models');

const findUsername = async (req) => {
    let loggedInUsername;
    if (req.session.loggedIn) {
        const loggedInUser = await User.findByPk(req.session.userId);
        loggedInUsername = loggedInUser.username;
    }

    return loggedInUsername;
};

module.exports = findUsername;