import { RidersController } from './../controllers/ridersController';
import {Request, Response, Router} from 'express';

export class Routes {

    public ridersController: RidersController = new RidersController();

    public router: Router;

    constructor(router: Router){
        this.router = router;
    }

    public routes(app): void {

        // middleware to use for all requests
        this.router.use(function (req, res, next) {
            // do logging
            console.log('Middleware to be implemented.');
            next(); // make sure we go to the next routes and don't stop here
        });

        this.router.route('/riders')
            .get(this.ridersController.getRiders);

        this.router.route('/riders/:rider_name')
            .get(this.ridersController.getRider);

    }
}