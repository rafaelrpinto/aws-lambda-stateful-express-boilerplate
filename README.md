Boilerplate for a stateful Express.js application running on AWS Lambda using Claudia.js, Babel(es2017) and DynamoDB for session synchronization.

### Running locally

`npm start`

### Deploying to AWS

Replace 'eu-west-2' for the desired region on package.json, access-dynamodb.json and run:

`npm run deploy`

### Updating a deployed app

`npm run update`

### Destroying/undeploying the app

`npm run update`
