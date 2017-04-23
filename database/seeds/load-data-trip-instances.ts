import AWS = require("aws-sdk");
import fs = require("fs");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing trip instances into DynamoDB. Please wait.");

interface TripInstance {
    trip_instance_uuid: '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
    customer_uuid: '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i',
    trip_id: string,
    created_at: number,
    updated_at: number
}

const tripInstances: Array<TripInstance> = JSON.parse(fs.readFileSync('database/data/trip-instances.json', 'utf8'));
tripInstances.forEach((tripInstance: TripInstance): void => {
    const params: AWS.DynamoDB.Types.PutItemInput = {
        TableName: "md_trip_instances",
        Item: {
            "trip_instance_uuid": tripInstance.trip_instance_uuid,
            "customer_uuid": tripInstance.customer_uuid,
            "trip_id": tripInstance.trip_id,
            "created_at": tripInstance.created_at,
            "updated_at": tripInstance.updated_at
        }
    };

    docClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput): void => {
        if (err) {
            console.error("Unable to add trip instance", tripInstance.trip_instance_uuid, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", tripInstance.trip_instance_uuid);
        }
    });
});
