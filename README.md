Boilerplate for a stateful Express.js application running on AWS Lambda using Claudia.js, Babel(es2017), Airbnb linting and DynamoDB for session synchronization.

### Running locally

Start a local DynamoDB as [described here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run:

`npm start`

### Deploying to AWS

Replace 'eu-west-2' for the desired region on package.json, access-dynamodb.json and run:

`npm run deploy`

### Updating a deployed app

`npm run update`

### Destroying/undeploying the app

`npm run update`
