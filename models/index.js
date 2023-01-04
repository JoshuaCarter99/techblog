const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

// User can have many blogposts (if delete user, also delete their blogposts)
User.hasMany(Blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Blogpost belongs to a User
Blogpost.belongsTo(User, {
    foreignKey: 'user_id'
});

// User can have many comments (if delete user, delete their comments too)
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comments belong to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Blogpost can have many comments from different users
// (if delete blogpost, also delete associated comments)
Blogpost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});

// Comments belong to a blogpost
Comment.belongsTo(Blogpost, {
    foreignKey: 'blogpost_id'
});

module.exports = { User, Blogpost, Comment };