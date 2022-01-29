const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Like, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
     
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
   })
   .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

// GET /api/posts/by id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    tributes: [
      'id',
      'content',
      'title',
      'created_at',
   
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// POST /api/posts
router.post('/', (req, res) => {
  // expects {title: 'Lernantino', content: 'www.uc.com',user_id:number}
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/likeed
router.put('/liked', (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.liked({ ...req.body, user_id: req.session.user_id }, { Like, Comment, User })
      .then(updatedLikeData => res.json(updatedLikeData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

// PUT /api/posts/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Post.update(req.body, 
    {
      title: req.body.title
    },
    {
    where: {
      id: req.params.id
    }
  })
    .then(postData => {
      if (!postData[0]) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/posts/1
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;