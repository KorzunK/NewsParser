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

            $('div.aposts').each(function(index){
                var aBoomLink = $(this).find('div.apostsimage > div.aptitle > h1 > a').attr('href');
                var aBoomTitle = $(this).find('div.apostsimage > div.aptitle > h1 > a').text();
                var aInfo = $(this).find('div.apostsimage > div.apsstory > div.apsstoryins');
                var aTXT = aInfo.text().replace(/^\s+|\s+$/g, '');
                dataBoom.push({
                    aBoomLink: aBoomLink,
                    aBoomTitle: aBoomTitle,
                    aTXT: aTXT

                });
            });

            $('div.sstory1').each(function(index){
                var sLink = $(this).find('a').attr('href');
                var sTitle = $(this).find('h1.sstory1tittle > a').text();
                var sInfo = $(this).find('div.sstory1text');
                var sTXT = sInfo.text().replace(/^\s+|\s+$/g, '');
                dataBoom.push({
                    sLink: sLink,
                    sTitle: sTitle,
                    sTXT: sTXT
                });
            });

            callback(null, dataBoom);
        }
    });
};

module.exports.getDataBoom = getDataBoom;
