const router = require('express').Router();
const { User } = require('../../models');


router.post('/login', async (req, res) => {
    try {

        const dbUserData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!dbUserData) {
            res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;
            res.status(200).json({ user: dbUserData, message: 'Successfully logged in!' });
            return;
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/signup', async (req, res) => {
    try {

        const findUser = await User.findOne(
            {
                where: {
                    username: req.body.username
                }
            }
        );

        if (findUser !== null) {
            res.status(400).json(findUser);
            return;
        }

        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.id;
            res.status(200).json(userData);
            return;
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;