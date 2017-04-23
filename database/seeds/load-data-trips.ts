import AWS = require("aws-sdk");
import fs = require("fs");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing trips into DynamoDB. Please wait.");

interface Trip {
    trip_id: string,
    name: string,
    description: string,
    continent: string,
    countries: Array<string>,
    regions: Array<string>,
    days: number,
    type: string,
    level: number,
    price: number,
    rating: number
}

const trips: Array<Trip> = JSON.parse(fs.readFileSync('database/data/trips.json', 'utf8'));
trips.forEach((trip: Trip): void => {
    const params: AWS.DynamoDB.Types.PutItemInput = {
        TableName: "md_trips",
        Item: {
            "trip_id": trip.trip_id,
            "name": trip.name,
            "description": trip.description,
            "continent": trip.continent,
            "countries": trip.countries,
            "regions": trip.regions,
            "days": trip.days,
            "type": trip.type,
            "level": trip.level,
            "price": trip.price,
            "rating": trip.rating
        }
    };

    docClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput): void => {
        if (err) {
            console.error("Unable to add trip", trip.trip_id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", trip.trip_id);
        }
    });
});
