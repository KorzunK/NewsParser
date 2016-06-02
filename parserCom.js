var request = require('request');
var http = require('http');
var cheerio = require('cheerio');
var express = require('express');

var getDataCOM = function(callback) {
    var dataCOM = [];
    request('http://spidermedia.ru/comics', function (error, response, body)
    {
        if (error) {
            callback(error, null);
        }
        else {
            var $ = cheerio.load(body);

            $('div.new-item.small').each(function(index){
                var comLink = $(this).find('div.new-title > a').attr('href');
                var comTitle = $(this).find('div.new-title > a').text();
                var comTXT = $(this).find('div.new-content').contents().first().text();
                var comDT = $(this).find('div.new-info');
                var comDate = comDT.text();
                dataCOM.push({
                    comDate: comDate,
                    comLink: comLink,
                    comTitle: comTitle,
                    comTXT: comTXT
                });
            });

            callback(null, dataCOM);
        }
    });
};

module.exports.getDataCOM = getDataCOM;
