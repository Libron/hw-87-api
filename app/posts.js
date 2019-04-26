const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const auth = require('../middleware/auth');

const Post = require('../models/Post');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', (req, res) => {
    Post.find().populate('author')
        .then(posts => res.send(posts))
        .catch(() => res.sendStatus(500));
});

// router.get('/:id', (req, res) => {
//     Post.findById(req.params.id)
//         .then(product => {
//             if (product) res.send(product);
//             else res.sendStatus(404);
//         })
//         .catch(() => res.sendStatus(500));
// });

router.post('/', auth, upload.single('image'), (req, res) => {
    const postData = req.body;
    if (req.file) {
        postData.image = req.file.filename;
    }

    postData.datetime = new Date().toISOString();
    postData.author = req.user._id;

    const post = new Post(postData);

    post.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});


module.exports = router;