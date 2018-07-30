import { Routes } from './routes/apiRoutes';
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";

class App {

    public app: express.Application;
    public myRoute: Routes;
    public router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
        this.myRoute = new Routes(this.router);
        this.myRoute.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use('/api/v1', this.router);
    }

}

export default new App().app;