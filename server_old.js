const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');

app.get('/', function (req, res) {
    res.set('text/html; charset=utf-8');
    res.send("<script>window.location.replace('http://www.motogp.com/en/riders');</script>");
    //https://iliad-api-beta.glitch.me
});

// Riders
app.get('/riders', function (req, res) {
    res.set('Content-Type', 'application/json');

    const lang = req.query.lang ? req.query.lang : 'it'; 
    const classe = req.query.classe ? req.query.classe : 'MotoGP'; 
    console.log(req.query.classe);

    var data_store = {
        'data': {}
    };

    var options = {
        url: 'http://www.motogp.com/'+lang+'/riders/'+classe,
        method: 'GET',
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var results = $('body');
            var array = [];
            console.log('I am in');
            try {
                data_store["data"] = {};
                $('ul.rider_list li').each(function (i, elm) {
                    data_store["data"][i] = {};
                    console.log($(this).find('p.name a').text()); // for testing do text()
                    data_store["data"][i]['name'] = $(this).find('p.name a').text();
                    data_store['data'][i]['image'] = $(this).find('a.decoration_none img').attr('src');
                    data_store['data'][i]['nation'] = $(this).find('p.flag_n img').attr('alt');
                    data_store['data'][i]['flag_image'] = $(this).find('p.flag_n img').attr('src');
                    data_store["data"][i]['num'] = $(this).find('span.num').text();
                    data_store["data"][i]['link'] = $(this).find('p.name a').attr('href');
                    // $(this).find('p.name a').text();
                });
                res.send(data_store);
            } catch (exeption) {
                console.log(exeption);
                res.sendStatus(503);
            }
        };
    });
});

// Rider
app.get('/rider', function (req, res) {
    res.set('Content-Type', 'application/json');

    const lang = req.query.lang ? req.query.lang : 'en';
    const name = req.query.name ? req.query.name.replace(' ', '+') : '';
    console.log(name);

    var data_store = {
        'data': {}
    };

    var options = {
        url: 'http://www.motogp.com/' + lang + '/riders/' + name,
        method: 'GET',
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var results = $('body');
            var array = ['name', 'team', 'bike', 'plc_birth', 'date_birth', 'weight', 'height'];
            console.log('I am in');
            try {
                data_store["data"] = {};
                $('div.details p').each(function (i, elm) {
                    data_store["data"][array[i]] = {};
                    data_store["data"][array[i]] = $(this).text();
                });
                data_store["data"]["bike_image"] = $('img.bike_image').attr('src');
                data_store["data"]["career_summary"] = {};
                array = [];
                $('div.career-summary thead th').each(function (i, elm){
                    array[i] = $(this).text();
                    // console.log($(this).text());
                });
                $('div.career-summary tbody tr').each(function (i, elm) {
                    var section = $(this).find('th').text();
                    data_store["data"]["career_summary"][section] = {};
                    $(this).find('td').each(function(j,el){
                        data_store["data"]["career_summary"][section][array[j+1]]= {};
                        data_store["data"]["career_summary"][section][array[j + 1]] = $(this).text();
                    });
                });
                data_store["data"]["career_statistics"] = {};
                array = [];
                $('div.career-statistics thead th').each(function (i, elm) {
                    array[i] = $(this).text();
                    // console.log($(this).text());
                });
                $('div.career-statistics tbody tr').each(function (i, elm) {
                    data_store["data"]["career_statistics"][i] = {};
                    $(this).find('td').each(function (j, el) {
                        data_store["data"]["career_statistics"][i][array[j]] = {};
                        data_store["data"]["career_statistics"][i][array[j]] = $(this).text();                        
                    });
                });
                data_store["data"]["rider_bio_profile"] = {};
                data_store["data"]["rider_bio_profile"] = $('div#rider_bio_profile').text().replace(/^\s+|\s+$/gm, '');
                res.send(data_store);
            } catch (exeption) {
                console.log(exeption);
                res.sendStatus(503);
            }
        };
    });
});

// Rider
app.get('/final-standing', function (req, res) {
    res.set('Content-Type', 'application/json');

    const lang = req.query.lang ? req.query.lang : 'en';
    const year = req.query.year ? req.query.year : '2018';
    console.log(year);

    var data_store = {
        'data': {}
    };

    var options = {
        url: 'http://www.motogp.com/' + lang + '/ajax/results/parse_final_standing/' + year,
        method: 'GET',
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var results = $('body');
            var array = ['position', 'rider', 'bike', 'nation', 'points'];
            console.log('I am in');
            try {
                data_store["data"][year] = {};
                $('table tbody tr').each(function (i, elm) {
                    data_store["data"][i] = {};
                    $(this).find('td').each(function(j,el){
                        data_store["data"][i][array[j]] = $(this).text();
                    });
                });                
                res.send(data_store);
            } catch (exeption) {
                console.log(exeption);
                res.sendStatus(503);
            }
        };
    });
});

// Riders
app.get('/teams', function (req, res) {
    res.set('Content-Type', 'application/json');

    var data_store = {
        'motogp': {}
    };

    var options = {
        url: 'http://www.motogp.com/en/teams/Moto3',
        method: 'GET',
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var results = $('body');
            var array = [];
            console.log('I am in again');
            try {
                data_store["motogp"] = {};
                $('ul.list_team li').each(function (i, elm) {
                    data_store["motogp"][i] = {};
                    console.log($(this).find('span h3').text()); // for testing do text()
                    data_store["motogp"][i]['team_name'] = $(this).find('span h3').text();
                    var team_image = $(this).attr('style').substr(15);
                    team_image = team_image.substr(0, team_image.indexOf(') #'));
                    data_store["motogp"][i]['team_image'] = team_image;
                    data_store["motogp"][i]['team_riders'] = {};
                    $(this).find('a.gray_8').each(function(j, el) {
                        data_store["motogp"][i]['team_riders'][j] = {};
                        data_store["motogp"][i]['team_riders'][j]['name'] = $(this).text();
                        data_store["motogp"][i]['team_riders'][j]['link'] = $(this).attr('href');
                    });
                    // $(this).find('p.name a').text();
                });
                res.send(data_store);
            } catch (exeption) {
                console.log(exeption);
                res.sendStatus(503);
            }
        };
    });
});

// Calendar
app.get('/calendar', function (req, res) {
    res.set('Content-Type', 'application/json');

    var data_store = {
        'motogp': {}
    };

    var options = {
        url: 'http://www.motogp.com/en/calendar',
        method: 'GET',
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            var results = $('body');
            var array = [];
            console.log('I am in again');
            try {
                data_store["motogp"] = {};
                $('div.event_container').each(function (i, elm) {
                    data_store["motogp"][i] = {};
                    console.log($(this).find('div.event_title a').text()); // for testing do text()
                    data_store["motogp"][i]['event_location'] = $(this).find('div.location span').first().text().replace(/^\s+|\s+$/gm, '');
                    data_store["motogp"][i]['event_nation'] = $(this).find('div.location span').last().text().replace(/^\s+|\s+$/gm, '');
                    data_store["motogp"][i]['event_name'] = $(this).find('div.event_title a').text().replace(/^\s+|\s+$/gm, '');
                    data_store["motogp"][i]['event_date'] = $(this).find('div.event_day').text().replace(/^\s+|\s+$/gm, '') + "/" + $(this).find('div.event_month').text().replace(/^\s+|\s+$/gm, '');
                    data_store["motogp"][i]['test_event'] = $(this).find('img.event_test').length > 0;
                    var image = $(this).find('img.event_image').attr('src');
                    image = image.substr(0, image.indexOf('?version')).replace('324x143', '648x286');
                    data_store["motogp"][i]['event_image'] = image;
                });
                res.send(data_store);
            } catch (exeption) {
                console.log(exeption);
                res.sendStatus(503);
            }
        };
    });
});

const server = app.listen(1331, function () { });