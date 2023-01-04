const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');
// Custom middleware to check whether user is logged in or not
const withAuth = require('../../utils/withAuth');

// Create new comment on blogpost
router.post('/:id/comments', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            body: req.body.comment,
            user_id: req.session.userId,
            blogpost_id: req.params.id
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create new blogpost on dashboard & home
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Blogpost.create({
            title: req.body.postTitle,
            content: req.body.postBody,
            user_id: req.session.userId
        });

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete user's blogpost with same ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Blogpost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No blogpost found with this ID!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update user's blogpost with same ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Blogpost.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.userId
                }
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No blogpost found with this ID!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;