const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Add all mock users to User model
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Add all mock blogposts to Blogpost model
    const blogposts = await Blogpost.bulkCreate(blogpostData, {
        individualHooks: true,
        returning: true,
    });
    
    // Add all mock comments to Comment model
    const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();