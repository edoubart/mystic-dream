import AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const dynamoDb: AWS.DynamoDB = new AWS.DynamoDB();

const params: AWS.DynamoDB.Types.CreateTableInput = {
    "AttributeDefinitions": [
        {
            "AttributeName": "member_id",
            "AttributeType": "S"
        }
    ],
    "KeySchema": [
        {
            "AttributeName": "member_id",
            "KeyType": "HASH"
        }
    ],
    "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
    },
    "TableName": "md_members"
};


dynamoDb.createTable(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.CreateTableOutput): void => {
    if (err) {
        console.error("Unable to create table members. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("The table members has been created with success. Table description JSON:", JSON.stringify(data, null, 2));
    }
});