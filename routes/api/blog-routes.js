const router = require('express').Router(); 
const {Blog, User} = require('../../models')

router.get('/', (req, res) => {
  Blog.findAll({
    attributes: ['id', 'text', 'title', 'movie','created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'text', 'title', 'movie', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbBlogData => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbBlogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Blog.create({
    title: req.body.title,
    text: req.body.text,
    movie: req.body.movie,
    user_id: req.body.user_id
  })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
