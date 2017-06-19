Boilerplate for a stateful Express.js application running on AWS Lambda using Claudia.js, Babel(es2017), Airbnb linting and DynamoDB for session synchronization.

The .dist folder has the transpiled sources from the lib directory. This folder cannot be added to .gitignore otherwise claudia.js will ignore it too and the deploy to AWS will fail.

### Running locally

Start a local DynamoDB as [described here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) and run:

`npm start`

Then access the app on [localhost](https://localhost:8443).

### Deploying to AWS

Setup AWS cli as [decribed here](https://docs.aws.amazon.com/lambda/latest/dg/setup.html).

Replace 'eu-west-2' by the desired region on package.json and policies/access-dynamodb.json. If the aws cli local profile is different than 'default' you must change the 'deploy' script on package.json to inform the desired profile to claudia.js. Then run:

`npm run deploy`

### Updating a deployed app

`npm run update`

### Destroying/undeploying the app

`npm run update`
