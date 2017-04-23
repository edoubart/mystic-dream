import AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const dynamodb: AWS.DynamoDB = new AWS.DynamoDB();

const params: AWS.DynamoDB.Types.CreateTableInput = {
    "AttributeDefinitions": [
        {
            "AttributeName": "customer_uuid",
            "AttributeType": "S"
        }
    ],
    "KeySchema": [
        {
            "AttributeName": "customer_uuid",
            "KeyType": "HASH"
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
    },
    "TableName": "md_customers"
};


dynamodb.createTable(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.CreateTableOutput): void => {
    if (err) {
        console.error("Unable to create the customers table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("The customers table has been created with success. Table description JSON:", JSON.stringify(data, null, 2));
    }
});