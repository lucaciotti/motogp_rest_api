import { Riders } from './../models/riders';
import { RiderProfile } from './../models/riderProfile';
import { Request, Response } from 'express';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class RidersController {


    public getRiders(req: Request, res: Response) {
        res.set('Content-Type', 'application/json');

        const lang = req.query.lang ? req.query.lang : 'en';
        const classe = req.query.classe ? req.query.classe : 'MotoGP';

        var options = {
            url: 'http://www.motogp.com/' + lang + '/riders/' + classe,
            method: 'GET',
        };

        let ridersList = new Array<Riders>();
        
        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                var results = $('body');
                var array = [];
                try {
                    $('ul.rider_list li').each(function (i, elm) {
                        let name = $(this).find('p.name a').text();
                        let image = $(this).find('a.decoration_none img').attr('src');
                        let nation = $(this).find('p.flag_n img').attr('alt');
                        let flag_image: String = $(this).find('p.flag_n img').attr('src');
                        flag_image = flag_image.substr(0, flag_image.indexOf('?version'));
                        let num: Number = $(this).find('span.num').text();
                        let link = $(this).find('p.name a').attr('href');

                        ridersList.push(new Riders(name, nation, num, image,flag_image, link));                        
                    });
                    res.json(ridersList);
                } catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            };
        });
    }

    public getRider(req: Request, res: Response) {
        let lang = req.query.lang ? req.query.lang : 'en';
        let rider_name: String = req.params.rider_name;
        rider_name = rider_name.replace(' ', '+');

        let rider = new RiderProfile('Antonio');
        rider.addCareerSummary('first', 'motogp', 2);

        res.json(rider);
        
        /* let options = {
            url: 'http://www.motogp.com/' + lang + '/riders/' + rider_name,
            method: 'GET',
        };

        httpRequest(options, function (error, response, body) {
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
                    $('div.career-summary thead th').each(function (i, elm) {
                        array[i] = $(this).text();
                        // console.log($(this).text());
                    });
                    $('div.career-summary tbody tr').each(function (i, elm) {
                        var section = $(this).find('th').text();
                        data_store["data"]["career_summary"][section] = {};
                        $(this).find('td').each(function (j, el) {
                            data_store["data"]["career_summary"][section][array[j + 1]] = {};
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
        }); */
    }

}