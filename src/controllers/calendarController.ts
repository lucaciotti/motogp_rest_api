import { Request, Response } from 'express';

import { Calendar } from './../models/calendar';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class CalendarController {

    getCalendar(req: Request, res: Response) {

        var options = {
            url: 'http://www.motogp.com/en/calendar',
            method: 'GET',
        };

        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                let calendatList: Array<Calendar> = [];
                let thisYear = new Date().getFullYear().toString();
                try {
                    $('div.event_container').each(function (i, elm) {
                        let location = $(this).find('div.location span').first().text().replace(/^\s+|\s+$/gm, '');
                        let nation = $(this).find('div.location span').last().text().replace(/^\s+|\s+$/gm, '');
                        let name = $(this).find('div.event_title a').text().replace(/^\s+|\s+$/gm, '');
                        let date = new Date($(this).find('div.event_day').text().replace(/^\s+|\s+$/gm, '') + "/" + $(this).find('div.event_month').text().replace(/^\s+|\s+$/gm, '') + "/" + thisYear);
                        let isTest = $(this).find('img.event_test').length > 0;
                        let image = $(this).find('img.event_image').attr('src');
                        let circuit_link = $(this).find('a.event_image_container').attr('href');
                        if(name!=''){
                            image = image.substr(0, image.indexOf('?version')).replace('324x143', '648x286');
                            calendatList.push(new Calendar(name, date, location, nation, isTest, image, circuit_link));
                        }
                    });
                    res.json(calendatList);
                } catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            };
        });
    }
}