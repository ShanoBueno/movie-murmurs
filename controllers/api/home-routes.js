const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blog, User } = require('../../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Blog.findAll({
    attributes: [
      'id',
      'movie',
      'title',
      'created_at',
      
    ],
    include: [
     
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router;
