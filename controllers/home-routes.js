const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');
const findUsername = require('../utils/findUsername');
// Custom middleware to check whether user is logged in or not
const withAuth = require('../utils/withAuth');

// At /, redirect user to /home
router.get('/', async (req, res) => {
    res.redirect('/home');
});

// At /home, show all existing blog posts
router.get('/home', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            // Include associated Users' usernames
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogposts = blogpostData.map((blogpost => blogpost.get({ plain: true })));

        const loggedInUsername = await findUsername(req);
        
        res.render('home', {
            blogposts,
            loggedIn: req.session.loggedIn,
            username: loggedInUsername
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// At /dashboard, if logged in, show all of user's blogposts, button for new post
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            where: {
                user_id: req.session.userId
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogposts = blogpostData.map((blogpost => blogpost.get({ plain: true })));

        // Check if user has clicked on new post button
        let creatingPost = false;
        // If /dashboard?creatingPost=true
        if (req.query.creatingPost) {
            creatingPost = true;
        }

        const loggedInUsername = await findUsername(req);

        res.render('dashboard', {
            blogposts,
            loggedIn: req.session.loggedIn,
            creatingPost,
            dashboard: true,
            username: loggedInUsername
        });
    } catch (err) {
        res.status(500).json(err);
    };
})

// At /home/posts/:id, show all comments on blogpost and new comment form
router.get('/home/posts/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                // Include associated comments on blogpost, and users who left comments 
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                        }
                    ]
                }
        ]});
    
        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this ID!' });
            return;
        }

        const blogpost = blogpostData.get({ plain: true });
    
        const loggedInUsername = await findUsername(req);

        res.render('blogpost', {
            blogpost,
            comments: blogpost.comments,
            loggedIn: req.session.loggedIn,
            username: loggedInUsername
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// At /dashboard/posts/:id, show form to edit blogpost
router.get('/dashboard/posts/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
        ]});
    
        const blogpost = blogpostData.get({ plain: true });
    
        const loggedInUsername = await findUsername(req);

        res.render('edit-blogpost', {
            blogpost,
            loggedIn: req.session.loggedIn,
            dashboard: true,
            username: loggedInUsername
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render login form
router.get('/login', (req, res) => {
    // If already logged in, redirect user to dashboard
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    // If not logged in, render login page
    res.render('login');
});

// Sign up route
router.get('/signup', (req, res) => {
    // If already logged in, redirect user to dashboard 
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    // If not logged in, render signup page
    res.render('signup');
});

// Log out
router.get('/logout', (req, res) => {
    // If already logged in, destroy session, redirect user to home
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;