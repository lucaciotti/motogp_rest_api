import {Request, Response, Router} from 'express';

import { RidersController } from './../controllers/ridersController';
import { CalendarController } from './../controllers/calendarController';
import { TeamController } from './../controllers/teamController';
import { CircuitController } from './../controllers/circuitController';
import { eventController } from './../controllers/eventController';
import { finalRankController } from './../controllers/finalRankController';

export class Routes {

    public ridersController: RidersController = new RidersController();
    public calendarController: CalendarController = new CalendarController();
    public teamController: TeamController = new TeamController();
    public circuitController: CircuitController = new CircuitController();
    public eventController: eventController = new eventController();
    public finalRankController: finalRankController = new finalRankController();

    public router: Router;

    constructor(router: Router){
        this.router = router;
    }

    public routes(app): void {

        // MIDDLEWARE to use for all requests
        this.router.use(function (req, res, next) {
            res.set('Content-Type', 'application/json');
            // do logging
            console.log('Middleware to be implemented.');
            next(); // make sure we go to the next routes and don't stop here
        });

        this.router.route('/riders/:category?')
            .get(this.ridersController.getRiders);

        this.router.route('/riders/profile/:rider_name')
            .get(this.ridersController.getRiderProfile);

        this.router.route('/teams/:category?')
            .get(this.teamController.getTeams);

        this.router.route('/calendar')
            .get(this.calendarController.getCalendar);

        this.router.route('/circuit/:circuit?')
            .get(this.circuitController.getCircuit);

        this.router.route('/eventResult/:esercizio?/:event?/:category?/:session?')
            .get(this.eventController.getEventResult);

        this.router.route('/finalRanking/:esercizio?/:event?/:category?')
            .get(this.finalRankController.getFinalRank);
    }
}