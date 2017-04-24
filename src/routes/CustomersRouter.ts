import {Router, Request, Response, NextFunction} from 'express';
import AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();
const table: string = "md_customers";

export class CustomersRouter {
    router: Router;

    /*
     * Initialize the CustomersRouter.
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Get all customers.
     */
    private getAll(req: Request, res: Response, next: NextFunction) {
        const params: AWS.DynamoDB.Types.ScanInput = {
            TableName: table
        };

        docClient.scan(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.ScanOutput): void => {
            if (err) {
                res.status(404)
                    .send({
                        message: 'No customer found.',
                        status: res.status
                    });
            } else {
                res.status(200)
                    .send({
                        message: 'Success',
                        status: res.status,
                        data
                    });
            }
        });
    }

    /**
     * GET one customer by uuid.
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        const params: AWS.DynamoDB.Types.GetItemInput = {
            TableName: table,
            Key: {
                "customer_uuid": req.params.uuid
            }
        };

        docClient.get(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.GetItemOutput): void => {
            if (err) {
                res.status(404)
                    .send({
                        message: 'No customer found with the given uuid.',
                        status: res.status
                    });
            } else {
                res.status(200)
                    .send({
                        message: 'Success',
                        status: res.status,
                        data
                    });
            }
        });
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