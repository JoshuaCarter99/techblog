const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');
const findUsername = require('../utils/findUsername');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    res.redirect('/home');
});

router.get('/home', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({

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

        let creatingPost = false;

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

router.get('/home/posts/:id', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
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


router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 

    res.render('login');
});

router.get('/signup', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    } 
    res.render('signup');
});

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;