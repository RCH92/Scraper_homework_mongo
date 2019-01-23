var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');
db = require('../../models');

// module.exports = db => {
    router.get('/', (req, res) => res.render('home.ejs', {type: 'main'}));
    router.get('/comment/:id', (req, res) => {
        
        res.render('comment.ejs', {
           type: "comment",
           id: req.params.id
        });
    });
    module.exports = router;
// };

