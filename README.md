Boilerplate for a stateful Express.js application running on AWS Lambda using Claudia.js, Babel(es2017), Airbnb linting and DynamoDB for session synchronization.

### Running locally

Start a local DynamoDB as [described here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run:

`npm start`

### Deploying to AWS

Setup aws cli as [decribed here](https://docs.aws.amazon.com/lambda/latest/dg/setup.html).

Replace 'eu-west-2' by the desired region on package.json and policies/access-dynamodb.json. If the aws cli local profile is different than 'default' you must change the 'deploy' script on package.js to inform the desired profile to claudia.js. Then run:

`npm run deploy`

### Updating a deployed app

`npm run update`

### Destroying/undeploying the app

`npm run update`
