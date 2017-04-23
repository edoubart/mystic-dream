import AWS = require("aws-sdk");
import fs = require("fs");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing customers into DynamoDB. Please wait.");

interface Customer {
    customer_uuid: '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
    first_name: string,
    last_name: string,
    gender: string,
    date_of_birth: number,
    street_address: string,
    country: string,
    email: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
    phone: '^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$'
}

const customers: Array<Customer> = JSON.parse(fs.readFileSync('database/data/customers.json', 'utf8'));
customers.forEach((customer: Customer): void => {
    const params: AWS.DynamoDB.Types.PutItemInput = {
        TableName: "md_customers",
        Item: {
            "customer_uuid": customer.customer_uuid,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "gender": customer.gender,
            "date_of_birth": customer.date_of_birth,
            "street_address": customer.street_address,
            "country": customer.country,
            "email": customer.email,
            "phone": customer.phone
        }
    };

    docClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput): void => {
        if (err) {
            console.error("Unable to add customer", customer.customer_uuid, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", customer.customer_uuid);
        }
    });
});
