import AWS = require("aws-sdk");
import fs = require("fs");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing members into DynamoDB. Please wait.");

interface Member {
    member_id: string;
    team_id: string,
    first_name: string,
    last_name: string
}

const members: Array<Member> = JSON.parse(fs.readFileSync('database/data/members.json', 'utf8'));
members.forEach((member: Member): void => {
    const params: AWS.DynamoDB.Types.PutItemInput = {
        TableName: "md_members",
        Item: {
            "member_id": member.member_id,
            "team_id": member.team_id,
            "first_name": member.first_name,
            "last_name": member.last_name
        }
    };

    docClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput): void => {
        if (err) {
            console.error("Unable to add member", member.member_id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", member.member_id);
        }
    });
});
