var express = require('express');
var parserBoom = require('../parserBoom');
var parserStati = require('../parserStati');
var parserTV = require('../parserTV');
var parserCOM = require('../parserCOM');

var router = express.Router();

router.get('/main', function (req, res) {
    parserBoom.getDataBoom(function (err, result) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.render('main', {body: result});
    });
});

router.get('/news', function (req, res) {
    parserStati.getDataStati(function (err, result) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.render('news', {body: result});
    });
});

router.get('/serials', function (req, res) {
    parserTV.getDataTV(function (err, result) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.render('serials', {body: result});
    });
});

router.get('/comics', function (req, res) {
    parserCOM.getDataCOM(function (err, result) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        res.render('comics', {body: result});
    });
});

module.exports = router;
