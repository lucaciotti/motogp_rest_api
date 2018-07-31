import {Request, Response, Router} from 'express';

import { RidersController } from './../controllers/ridersController';
import { CalendarController } from './../controllers/calendarController';
import { TeamController } from './../controllers/teamController';

export class Routes {

    public ridersController: RidersController = new RidersController();
    public calendarController: CalendarController = new CalendarController();
    public teamController: TeamController = new TeamController();

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

        this.router.route('/riders/:category')
            .get(this.ridersController.getRiders);

        this.router.route('/rider/:rider_name')
            .get(this.ridersController.getRiderProfile);

        this.router.route('/calendar')
            .get(this.calendarController.getCalendar);

        this.router.route('/teams/:category')
            .get(this.teamController.getTeams);

    }
}