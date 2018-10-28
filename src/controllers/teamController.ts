import { Request, Response } from 'express';

import { Team } from './../models/team';

const httpRequest = require('request');
const cheerio = require('cheerio');

export class TeamController {

    getTeams(req: Request, res: Response){
        let lang = req.query.lang ? req.query.lang : 'en';
        let category: String = req.params.category ? req.params.category : 'MotoGp';
        var options = {
            url: 'http://www.motogp.com/'+lang+'/teams/'+category,
            method: 'GET',
        };

        httpRequest(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                let teamList: Array<Team> = [];
                try {
                    $('ul.list_team li').each(function (i, elm) {
                        let name = $(this).find('span h3').text();
                        let team_image = $(this).attr('style').substr(15);
                        team_image = team_image.substr(0, team_image.indexOf(') #'));

                        let team = new Team(name, team_image);

                        $(this).find('a.gray_8').each(function (j, el) {
                            team.addRiders($(this).text(), $(this).attr('href'));
                        });
                        teamList.push(team);
                    });
                    res.json(teamList);
                } catch (exeption) {
                    console.log(exeption);
                    res.sendStatus(503);
                }
            } else {
                res.send(response);
            };
        });
    }
}