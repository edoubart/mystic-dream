import {Router, Request, Response, NextFunction} from 'express';

const Customers = require('../../database/data/customers.json');

export class CustomersRouter {
    router: Router;

    /*
     * Initialize the CustomerRouter.
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Get all Customers.
     */
    private getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Customers);
    }

    /**
     * GET one customer by uuid.
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = req.params.uuid;
        let customer = Customers.find(customer => customer.customer_uuid === query);
        if (customer) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    customer
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No customer found with the given uuid.',
                    status: res.status
                });
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's endpoints.
     */
    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:uuid', this.getOne);
    }

}

// Create the CustomersRouter, and export its configured Express.Router
const customersRoutes = new CustomersRouter();
customersRoutes.init();

export default customersRoutes.router;