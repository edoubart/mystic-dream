import AWS = require("aws-sdk");
import fs = require("fs");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing steps into DynamoDB. Please wait.");

const enum Status {
    "initiated",
    "departure-to",
    "in-transit-to",
    "arrival-to",
    "in-progress",
    "completed",
    "departure_from",
    "in_transit_from",
    "arrival_from",
    "terminated",
    "cancelled",
    "emergency"
}

interface Step {
    trip_instance_uuid: '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
    timestamp: number,
    status: Status

}

const steps: Array<Step> = JSON.parse(fs.readFileSync('database/data/steps.json', 'utf8'));
steps.forEach((step: Step): void => {
    const params: AWS.DynamoDB.Types.PutItemInput = {
        TableName: "md_steps",
        Item: {
            "trip_instance_uuid": step.trip_instance_uuid,
            "timestamp": step.timestamp,
            "status": step.status
        }
    };

    docClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput): void => {
        if (err) {
            console.error("Unable to add step", step.trip_instance_uuid, "|", step.timestamp, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", step.trip_instance_uuid, "|", step.timestamp);
        }
    });
});
