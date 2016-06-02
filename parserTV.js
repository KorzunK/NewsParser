var request = require('request');
var http = require('http');
var cheerio = require('cheerio');
var express = require('express');

var getDataTV = function(callback) {
    var dataTV = [];
    request('http://geekcity.ru/category/tvshow/', function (error, response, body)
    {
        if (error) {
            callback(error, null);
        }
        else {
            var $ = cheerio.load(body);

            $('article.omc-blog-two').each(function(index){
                var tvLink = $(this).find('a').attr('href');
                var tvTitle = $(this).find('div.omc-blog-two-text > h2 > a').text();
                var tvTXT = $(this).find('div.omc-blog-two-text > p.omc-blog-two-exceprt').text();
                var tvDt = $(this).find('div.omc-blog-two-text > p.omc-blog-two-date').contents().first();
                var tvDate = tvDt.text().replace('|', '');
                dataTV.push({
                    tvDate: tvDate,
                    tvLink: tvLink,
                    tvTitle: tvTitle,
                    tvTXT: tvTXT
                });
            });

            callback(null, dataTV);
        }
    });
};

module.exports.getDataTV = getDataTV;
