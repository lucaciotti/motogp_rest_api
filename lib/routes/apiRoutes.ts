import { RidersController } from './../controllers/ridersController';
import {Request, Response} from 'express';

export class Routes {

    public ridersController: RidersController = new RidersController();

    public routes(app): void {

        app.route('/riders').get(
            this.ridersController.getRiders
        );

    }
}