"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiRoutes_1 = require("./routes/apiRoutes");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
        this.myRoute = new apiRoutes_1.Routes(this.router);
        this.myRoute.routes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use('/api/v1', this.router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map