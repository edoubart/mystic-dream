import AWS = require("aws-sdk");
import fs = require("fs");

AWS.config.update({
    region: "us-west-2"
    // endpoint: "http://localhost:8000"
});

const docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing teams into DynamoDB. Please wait.");

interface Team {
    team_id: string;
    name: string,
    location: string,
    members: number
}

const teams: Array<Team> = JSON.parse(fs.readFileSync('database/data/teams.json', 'utf8'));
teams.forEach((team: Team): void => {
    const params: AWS.DynamoDB.Types.PutItemInput = {
        TableName: "md_teams",
        Item: {
            "team_id": team.team_id,
            "name": team.name,
            "location": team.location,
            "members": team.members
        }
    };

    docClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput): void => {
        if (err) {
            console.error("Unable to add team", team.team_id, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", team.team_id);
        }
    });
});
