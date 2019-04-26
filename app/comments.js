const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

router.get('/', (req, res) => {
    let searchParam = null;
    if (req.query.postId) {
        searchParam = {post: req.query.postId};
    }

    Comment.find(searchParam).populate('post').populate('user').sort({datetime: -1})
        .then(result => res.send(result))
        .catch(e => res.status(500).send(e));
});

router.post('/', auth, (req, res) => {
    const commentData = req.body;
    commentData.user = req.user._id;
    const comment = new Comment(commentData);
    comment.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;