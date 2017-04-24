import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import CustomersRouter from './routes/CustomersRouter';
import StepsRouter from './routes/StepsRouter';

class App {

    // Reference to the application instance
    public express: express.Application;

    /*
     * Initialize the Express App.
     */
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Middleware
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    // Routes
    private routes(): void {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Welcome to the Mystic Dream API!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/customers', CustomersRouter);
        this.express.use('/api/v1/steps', StepsRouter);
    }

}

export default new App().express;