import { Riders } from './../models/riders';
import { Request, Response } from 'express';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class RidersController {


    public getRiders(req: Request, res: Response) {
        res.set('Content-Type', 'application/json');

        const lang = req.query.lang ? req.query.lang : 'en';
        const classe = req.query.classe ? req.query.classe : 'MotoGP';
        console.log(req.query.classe);

        var data_store = {
            'data': {}
        };

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
                console.log('I am in');
                try {
                    data_store["data"] = {};
                    $('ul.rider_list li').each(function (i, elm) {
                        // data_store["data"][i] = {};
                        console.log($(this).find('p.name a').text()); // for testing do text()
                        let name = $(this).find('p.name a').text();
                        let image = $(this).find('a.decoration_none img').attr('src');
                        let nation = $(this).find('p.flag_n img').attr('alt');
                        let flag_image = $(this).find('p.flag_n img').attr('src');
                        let num = $(this).find('span.num').text();
                        let link = $(this).find('p.name a').attr('href');
                        ridersList.push(new Riders(name, nation, num, image,flag_image, link));
                        // data_store["data"][i]['name'] = $(this).find('p.name a').text();
                        // data_store['data'][i]['image'] = $(this).find('a.decoration_none img').attr('src');
                        // data_store['data'][i]['nation'] = $(this).find('p.flag_n img').attr('alt');
                        // data_store['data'][i]['flag_image'] = $(this).find('p.flag_n img').attr('src');
                        // data_store["data"][i]['num'] = $(this).find('span.num').text();
                        // data_store["data"][i]['link'] = $(this).find('p.name a').attr('href');
                    });
                    res.json(ridersList);
                    // res.send(data_store);
                } catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            };
        });
    }
}