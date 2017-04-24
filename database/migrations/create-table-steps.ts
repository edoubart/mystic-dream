import AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const dynamoDb: AWS.DynamoDB = new AWS.DynamoDB();

const params: AWS.DynamoDB.Types.CreateTableInput = {
    "AttributeDefinitions": [
        {
            "AttributeName": "trip_instance_uuid",
            "AttributeType": "S"
        },
        {
            "AttributeName": "timestamp",
            "AttributeType": "N"
        }
    ],
    "KeySchema": [
        {
            "AttributeName": "trip_instance_uuid",
            "KeyType": "HASH"
        },
        {
            "AttributeName": "timestamp",
            "KeyType": "RANGE"
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
    },
    "TableName": "md_steps"
};


dynamoDb.createTable(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.CreateTableOutput): void => {
    if (err) {
        console.error("Unable to create table steps. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("The table steps has been created with success. Table description JSON:", JSON.stringify(data, null, 2));
    }
});