import { Request, Response } from "express";
import { finalRank } from './../models/finalRank';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class finalRankController {
         public getProgressiveRank(req: Request, res: Response) {
           let lang = req.query.lang ? req.query.lang : "en";
           let esercizio: String = req.params.esercizio
             ? req.params.esercizio
             : "2020";
           let event: String = req.params.event ? req.params.event : "QAT";
           let category: String = req.params.category
             ? req.params.category
             : "MotoGP";
           let session: String = "RAC";

           var httpGetSessionTypes = {
          url:
            "https://www.motogp.com/en/ajax/results/selector/" +
            esercizio +
            "/" +
            event +
            "/" +
            category,
          method: "GET",
        };
        httpRequest(httpGetSessionTypes, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var yourObj: Map<any, any> = JSON.parse(body);
            yourObj.forEach((element) => {
              if (session == "RAC") {
                if (element.value == "RAC2") {
                  session = "RAC2";
                }
              }
            });

            // https://www.motogp.com/en/Results+Statistics/2020/QAT/MotoGP/RAC/World+Standing
            var options = {
              url:
                "http://www.motogp.com/" +
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
                  let finRank = new finalRank(esercizio, event, category);

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
                      finRank.addRank(
                        rider_name,
                        rider_nation,
                        bike,
                        position,
                        points
                      );
                    }
                  });
                  res.json(finRank);
                } catch (exeption) {
                  console.log(exeption);
                  res.sendStatus(503);
                }
              }
            });
          }
        });
         }

         public getSeasonRank(req: Request, res: Response) {
           let lang = req.query.lang ? req.query.lang : "en";
           let esercizio: string = req.params.esercizio
             ? req.params.esercizio
             : "2020";
           let event: String = req.params.event ? req.params.event : "QAT";
           let category: String = req.params.category
             ? req.params.category
             : "MotoGP";
           let session: String = "RAC";
            
           var options = {
             url:
               "http://www.motogp.com/" +
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
                 let href :String = $("div#season_results ul li")
                   .first().find('a')
                   .attr("href");
                console.log(href.substr(href.indexOf(esercizio)+5,3));
                // TODO: DA IMPLEMENTARE MOLTO MEGLIO EH...
                var options2 = {
                  url:
                    "https://motogpapi.herokuapp.com/api/v1/progrRanking/" +
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
               } catch (exeption) {
                 console.log(exeption);
                 res.sendStatus(503);
               }
             }
           });
         }
       }