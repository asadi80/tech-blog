const router = require('express').Router();
const { Post,User } = require('../../models');

// GET /api/posts
router.get('/', (req, res) => {
   
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
      order: [['created_at', 'DESC']], 
      include: [
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
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
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
    // expects {title: 'Lernantino', post_url: 'www.uc.com',user_id:number}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id:req.body.user_id,
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// PUT /api/posts/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Post.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
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
          res.status(404).json({ message: 'No user found with this id' });
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