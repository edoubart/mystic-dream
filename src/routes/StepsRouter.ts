import {Router, Request, Response, NextFunction} from 'express';
import AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();
const table: string = "md_steps";

export class StepsRouter {
    router: Router;

    /*
     * Initialize the StepsRouter.
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Get all steps for a trip instance by uuid.
     */
    public getTripInstanceSteps(req: Request, res: Response, next: NextFunction) {
        const params: AWS.DynamoDB.Types.QueryInput = {
            TableName: table,
            KeyConditionExpression: "#trip_instance_uuid = :trip_instance_uuid",
            ExpressionAttributeNames: {
                "#trip_instance_uuid": "trip_instance_uuid"
            },
            ExpressionAttributeValues: {
                ":trip_instance_uuid": req.params.uuid
            }
        };

        docClient.query(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.QueryOutput): void => {
            if (err) {
                res.status(404)
                    .send({
                        message: 'No steps found with the given uuid.',
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
        this.router.get('/:uuid', this.getTripInstanceSteps);
    }

}

// Create the StepsRouter, and export its configured Express.Router
const stepsRoutes = new StepsRouter();
stepsRoutes.init();

export default stepsRoutes.router;