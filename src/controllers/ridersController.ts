import { Request, Response } from 'express';

import { Riders } from './../models/riders';
import { RiderProfile } from './../models/riderProfile';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class RidersController {


    public getRiders(req: Request, res: Response) {
        let lang = req.query.lang ? req.query.lang : 'en';
        let category: String = req.params.category ? req.params.category : 'MotoGP';

        var options = {
            url: 'http://www.motogp.com/' + lang + '/riders/' + category,
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

    public getRiderProfile(req: Request, res: Response) {
        let lang = req.query.lang ? req.query.lang : 'en';
        let rider_name: String = req.params.rider_name;
        rider_name = rider_name.replace(' ', '+');

        let options = {
            url: 'http://www.motogp.com/' + lang + '/riders/profile/' + rider_name,
            method: 'GET',
        };

        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                // let results = $('body');
                let defaulKey = [];
                let statisticKey = [];
                let data = {};
                try {
                    let profile = new RiderProfile();
                    defaulKey = profile.getArrayOfDefaultKey();
                    $('div.details p').each(function (i, elm) {
                        data[defaulKey[i]] = {};
                        data[defaulKey[i]] = $(this).text().trim();
                    });
                    profile.setDefaultValue(data);
                    profile.setBikeImage($('img.bike_image').attr('src'));

                    $('div.career-summary tbody tr').each(function (i, elm) {
                        let title = $(this).find('th').text();
                        let value: number[] = [];
                        $(this).find('td').each(function (j, el) {
                            value[j] = $(this).text();
                        });
                        profile.addCareerSummary(title, value[0], value[1], value[2], value[3]);
                    });

                    statisticKey = profile.getArrayOfStatistictKey();;
                    $('div.career-statistics tbody tr').each(function (i, elm) {
                        data = {};
                        $(this).find('td').each(function (j, el) {
                            data[statisticKey[j]] = {};
                            data[statisticKey[j]] = $(this).text();
                        });
                        profile.addCareerStatistics(data);
                    });

                    profile.setBioProfile( $('div#rider_bio_profile').text().replace(/^\s+|\s+$/gm, ''));
                    res.send(profile);
                } catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            };
        });
    }

}