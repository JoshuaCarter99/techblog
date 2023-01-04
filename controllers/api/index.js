const router = require('express').Router();

const userRoutes = require('./user-routes');
const postsRoutes = require('./posts-routes');

router.use('/users', userRoutes);
router.use('/posts', postsRoutes);

module.exports = router;