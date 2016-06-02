var request = require('request');
var http = require('http');
var cheerio = require('cheerio');
var express = require('express');
var iconv = require("iconv-lite");
var encoding = "windows-1251";

var getDataStati = function(callback) {
    request({uri: 'http://comicsboom.net/stati/', encoding:null}, function (error, response, body)
    {
        if (error) {
            callback(error, null);
        }
        else {
            var decbody = iconv.decode(body, encoding);
            var dataStati = [];
            var $ = cheerio.load(decbody);

            $('div.sstory1').each(function(index){
                var stLink = $(this).find('a').attr('href');
                var stTitle = $(this).find('h1.sstory1tittle > a').text();
                var stInfo = $(this).find('div.sstory1text');
                var stTXT = stInfo.text().replace(/^\s+|\s+$/g, '');
                dataStati.push({
                    stLink: stLink,
                    stTitle: stTitle,
                    stTXT: stTXT
                });
            });

            callback(null, dataStati);
        }
    });
};

module.exports.getDataStati = getDataStati;
