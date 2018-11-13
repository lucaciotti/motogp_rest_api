"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ridersController_1 = require("./../controllers/ridersController");
const calendarController_1 = require("./../controllers/calendarController");
const teamController_1 = require("./../controllers/teamController");
const circuitController_1 = require("./../controllers/circuitController");
const eventController_1 = require("./../controllers/eventController");
const finalRankController_1 = require("./../controllers/finalRankController");
class Routes {
    constructor(router) {
        this.ridersController = new ridersController_1.RidersController();
        this.calendarController = new calendarController_1.CalendarController();
        this.teamController = new teamController_1.TeamController();
        this.circuitController = new circuitController_1.CircuitController();
        this.eventController = new eventController_1.eventController();
        this.finalRankController = new finalRankController_1.finalRankController();
        this.router = router;
    }
    routes(app) {
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
exports.Routes = Routes;
//# sourceMappingURL=apiRoutes.js.map