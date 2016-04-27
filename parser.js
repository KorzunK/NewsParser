var request = require('request');
var http = require('http');
var cheerio = require('cheerio');
var express = require('express');
var iconv = require("iconv-lite");
var encoding = "windows-1251";

var getDataBoom = function(callback) {
    request({uri: 'http://comicsboom.net', encoding:null}, function (error, response, body)
    {
        if (error) {
            callback(error, null);
        }
        else {
            var decbody = iconv.decode(body, encoding);
            var dataBoom = [];
            var $ = cheerio.load(decbody);

            $('div.aposts .aptitle' ).each(function(){
                var aBoomLink = $(this).children().children().attr('href');
                var aBoomTitle = $(this);
                dataBoom.push({
                    aBoomLink: aBoomLink,
                    aBoomTitle: aBoomTitle.text()
                });
            });

            /*$('div.apsstory .apsstoryins' ).each(function(){
             var info = $(this);
             var txt = info.text().replace(/^\s+|\s+$/g, '');
             dataBoom.push({
             txt: txt
             });
             });*/

            $('div.sstory1 .sstory1tittle' ).each(function(){
                var bLink = $(this).children().attr('href');
                var bTitle = $(this);
                if (bLink !== ' ' && bTitle !== ' ') {
                    dataBoom.push({
                        bLink: bLink,
                        bTitle: bTitle.text()
                    });
                }
            });

            callback(null, dataBoom);
        }
    });
};

module.exports.getDataBoom = getDataBoom;
