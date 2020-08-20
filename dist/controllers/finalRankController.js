"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const finalRank_1 = require("./../models/finalRank");
const httpRequest = require('request');
const cheerio = require('cheerio');
class finalRankController {
    getProgressiveRank(req, res) {
        let lang = req.query.lang ? req.query.lang : "en";
        let esercizio = req.params.esercizio
            ? req.params.esercizio
            : "2020";
        let event = req.params.event ? req.params.event : "QAT";
        let category = req.params.category
            ? req.params.category
            : "MotoGP";
        let session = "RAC";
        // https://www.motogp.com/en/Results+Statistics/2020/QAT/MotoGP/RAC/World+Standing
        var options = {
            url: "http://www.motogp.com/" +
                lang +
                "/Results+Statistics/" +
                esercizio +
                "/" +
                event +
                "/" +
                category +
                "/" +
                session +
                "/World+Standing",
            method: "GET",
        };
        console.log(options);
        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                try {
                    let finRank = new finalRank_1.finalRank(esercizio, event, category);
                    let position;
                    let points;
                    let rider_name;
                    let rider_nation;
                    let bike;
                    $("div#main_result table tbody tr").each(function (j, elm) {
                        rider_name = "";
                        $(this)
                            .find("td")
                            .each(function (i, elm) {
                            switch (i) {
                                case 0: {
                                    position = $(this).text();
                                    break;
                                }
                                case 1: {
                                    rider_name = $(this).text();
                                    break;
                                }
                                case 2: {
                                    bike = $(this).text();
                                    break;
                                }
                                case 3: {
                                    rider_nation = $(this).text();
                                    break;
                                }
                                case 4: {
                                    points = $(this).text();
                                    break;
                                }
                            }
                        });
                        if (rider_name != "") {
                            finRank.addRank(rider_name, rider_nation, bike, position, points);
                        }
                    });
                    res.json(finRank);
                }
                catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            }
        });
    }
    getSeasonRank(req, res) {
        let lang = req.query.lang ? req.query.lang : "en";
        let esercizio = req.params.esercizio
            ? req.params.esercizio
            : "2020";
        let event = req.params.event ? req.params.event : "QAT";
        let category = req.params.category
            ? req.params.category
            : "MotoGP";
        let session = "RAC";
        var options = {
            url: "http://www.motogp.com/" +
                lang +
                "/Results+Statistics/" +
                esercizio +
                "/" +
                event +
                "/" +
                category +
                "/" +
                session +
                "/World+Standing",
            method: "GET",
        };
        console.log(options);
        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                try {
                    let href = $("div#season_results ul li")
                        .first().find('a')
                        .attr("href");
                    console.log(href.substr(href.indexOf(esercizio) + 5, 3));
                    var options2 = {
                        url: "http://localhost:3000/api/v1/progrRanking/" +
                            esercizio +
                            "/" +
                            href.substr(href.indexOf(esercizio) + 5, 3) +
                            "/" +
                            category,
                        method: "GET",
                    };
                    httpRequest(options2, function (error, response) {
                        res.send(response.body);
                    });
                }
                catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            }
        });
    }
}
exports.finalRankController = finalRankController;
//# sourceMappingURL=finalRankController.js.map