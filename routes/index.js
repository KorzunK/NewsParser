var express = require('express');
var parser = require('../parser');

var router = express.Router();

router.get('/', function (req, res) {
    parser.getDataBoom(function (err, result) {
        if (err) {
            err.status = 404;
            res.render('error', {body: '<b>404: Not Found</b>',
                error: err.status, message: err.message});
        } else {
            res.render('index', {body: result});
        }
    });
});

module.exports = router;
