import { Request, Response } from "express";
import { eventResult } from '../models/eventResult';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class eventController {

    public getEventResult(req: Request, res: Response) {
        let lang = req.query.lang ? req.query.lang : 'en';
        let esercizio: String = req.params.esercizio ? req.params.esercizio : '2018';
        let event: String = req.params.event ? req.params.event : 'QAT';
        let category: String = req.params.category ? req.params.category : 'MotoGP';
        let session: String = req.params.session ? req.params.session : 'RAC';

        var options = {
            url: 'http://www.motogp.com/' + lang + '/ajax/results/parse/' + esercizio + '/' + event + '/' + category + '/' + session,
            method: 'GET',
        };
        console.log(options);
        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                try {
                    let eventRes = new eventResult(esercizio, event, category, session);
                    let hasPoints = false;
                    $('table thead th').each(function (i, elm) {
                        if ($(this).text()=='Points') hasPoints = true;
                    });
                    console.log(hasPoints);

                    let position;
                    let points;
                    let rider_num;
                    let rider_name;
                    let rider_team;
                    let rider_nation;
                    let bike;
                    let speed;
                    let time;                    
                    $('table').first().find('tbody tr').each(function (j, elm) {
                        rider_name = '';
                        $(this).find('td').each(function (i, elm) {
                            if (!hasPoints && i>0) i++;
                            switch (i) {
                                case 0: {
                                    position = $(this).text();
                                    break;
                                }
                                case 1: {
                                    points = $(this).text();
                                    break;
                                }
                                case 2: {
                                    rider_num = $(this).text();
                                    break;
                                }
                                case 3: {
                                    rider_name = $(this).text();
                                    break;
                                }
                                case 4: {
                                    rider_nation = $(this).text();
                                    break;
                                }
                                case 5: {
                                    rider_team = $(this).text();
                                    break;
                                }
                                case 6: {
                                    bike = $(this).text();
                                    break;
                                }
                                case 7: {
                                    speed = $(this).text();
                                    break;
                                }
                                case 8: {
                                    time = $(this).text();
                                    break;
                                }
                            }
                        });
                        if (rider_name!=''){
                            eventRes.addRanking(rider_name, rider_num, rider_team, rider_nation, bike, position, speed, time, points);
                        }
                    });

                    let air_temp;
                    let ground_temp;
                    let humidity;
                    let track_condition;
                    $('span').each(function (i,elm){
                        if ($(this).text().indexOf('Track')==0) {
                            track_condition = $(this).text();
                        } else if ($(this).text().indexOf('Ground') == 0) {
                            ground_temp = $(this).text();
                        } else if ($(this).text().indexOf('Air') == 0) {
                            air_temp = $(this).text();
                        } else if ($(this).text().indexOf('Humidity') == 0) {
                            humidity = $(this).text();
                        }
                    });
                    
                    if (Number(esercizio) > 2004) {
                        eventRes.addWeather(air_temp, ground_temp, humidity, track_condition);
                    }

                    let type;
                    let detail;
                    $('table').last().find('tbody tr').each(function (j, elm) {
                        type = $(this).find('th').text();
                        $(this).find('td').each(function (i, elm) {
                            // i=i++;
                            switch (i) {
                                case 0: {
                                    detail = $(this).text();
                                    break;
                                }
                                case 1: {
                                    rider_name = $(this).text();
                                    break;
                                }
                                case 2: {
                                    time = $(this).text();
                                    break;
                                }
                                case 3: {
                                    speed = $(this).text();
                                    break;
                                }
                            }
                        });
                        eventRes.addRecords(type, detail, rider_name, time, speed);
                    });

                    res.json(eventRes);
                } catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            };
        });

    }

    // public getEventFile{
    // http://www.motogp.com/en/ajax/results/files/2018/MAL/MotoGP/RAC
    // }
}