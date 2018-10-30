"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const circuit_1 = require("./../models/circuit");
const httpRequest = require('request');
const cheerio = require('cheerio');
class CircuitController {
    getCircuit(req, res) {
        let lang = req.query.lang ? req.query.lang : 'en';
        let circuit = req.params.circuit ? req.params.circuit : 'ITALY';
        var options = {
            url: 'http://www.motogp.com/' + lang + '/event/' + circuit,
            method: 'GET',
        };
        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                try {
                    let name = $('h1#circuit_title').text();
                    let href_extra = $('div.c-event__destination-guide iframe').attr('src');
                    let autodrome = $('div.circuit_subtitle').first().text();
                    let nation = $('div.circuit_subtitle').last().text();
                    let length_euro = '';
                    let length_anglo = '';
                    let corner_left = '';
                    let corner_right = '';
                    let width_euro = '';
                    let width_anglo = '';
                    let longstraight_euro = '';
                    let longstraight_anglo = '';
                    $('div.circuit_number_container').each(function (i, elm) {
                        switch (i) { //($(this).find('div.circuit_number_title').text())
                            case 0: { //'LENGTH'
                                length_euro = $(this).find('div.circuit_number_content').attr('data-units-euro');
                                length_anglo = $(this).find('div.circuit_number_content').attr('data-units-anglo');
                                break;
                            }
                            case 1: { //'CORNER'
                                $(this).find('div.circuit_number_content').each(function (j, val) {
                                    switch (j) {
                                        case 0: {
                                            corner_left = $(this).text();
                                            break;
                                        }
                                        case 1: {
                                            corner_right = $(this).text();
                                            break;
                                        }
                                    }
                                });
                                break;
                            }
                            case 2: { //'WIDTH'
                                width_euro = $(this).find('div.circuit_number_content').attr('data-units-euro');
                                width_anglo = $(this).find('div.circuit_number_content').attr('data-units-anglo');
                                break;
                            }
                            case 3: { //'LONG STRAIGHT'
                                longstraight_euro = $(this).find('div.circuit_number_content').attr('data-units-euro');
                                longstraight_anglo = $(this).find('div.circuit_number_content').attr('data-units-anglo');
                                break;
                            }
                        }
                    });
                    let image_circuit = $('img.img-responsive.track').attr('src');
                    let short_description = $('div.c-event__circuit-description').text();
                    let date = $('div.event-date__date').first().text();
                    let air_temp = $('span.weather__info__temp--air div.temp__value').text();
                    let ground_temp = $('span.weather__info__temp--ground div.temp__value').text();
                    let motopg_laps = 0;
                    let moto2_laps = 0;
                    let moto3_laps = 0;
                    let motogp_tot_dist = '';
                    let moto2_tot_dist = '';
                    let moto3_tot_dist = '';
                    $('div.c-laps__item').each(function (i, elm) {
                        switch (i) {
                            case 1: {
                                motopg_laps = $(this).text();
                                break;
                            }
                            case 2: {
                                moto2_laps = $(this).text();
                                break;
                            }
                            case 3: {
                                moto3_laps = $(this).text();
                                break;
                            }
                            case 9: {
                                motogp_tot_dist = $(this).text();
                                break;
                            }
                            case 10: {
                                moto2_tot_dist = $(this).text();
                                break;
                            }
                            case 11: {
                                moto3_tot_dist = $(this).text();
                                break;
                            }
                        }
                    });
                    let circuit = new circuit_1.Circuit(name, nation, autodrome, date, air_temp, ground_temp, short_description, length_euro, length_anglo, corner_left, corner_right, width_euro, width_anglo, longstraight_euro, longstraight_anglo, image_circuit, motopg_laps, moto2_laps, moto3_laps, motogp_tot_dist, moto2_tot_dist, moto3_tot_dist);
                    $('div[data-tab=c-event__category-info__motogp] div.most-wins li').each(function (i, elm) {
                        let rider_name = $(this).find('div.most-wins__rider-name').text();
                        let rider_number = $(this).find('div.most-wins__rider-number').text();
                        let value = $(this).find('div.most-wins__data-value').text();
                        // console.log(rider_name+" "+rider_number);
                        circuit.addMotoGpMostWins(rider_name, rider_number, value);
                    });
                    // .attr('data-tab', 'c-event__category-info__motogp')
                    res.json(circuit);
                }
                catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            }
            ;
        });
    }
}
exports.CircuitController = CircuitController;
// $('div.c-event__destination-guide body').each(function (i, elm) {
//     let location = $(this).find('h2 c-widget--title').text();
//     let descrizion = $(this).find('div.c-windget__text').text();
//     let www_site = $(this).find('div.c-windget__text-right').text();
//     let weather_suggestion = $(this).find('div.c-windget__text--emergency').text();
//     console.log(location + " " + descrizion + " " + www_site + " " + weather_suggestion);
// });
//# sourceMappingURL=circuitController.js.map