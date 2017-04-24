# Mystic Dream

An API to manage, share, and track customer experience

## Run

To install the dependencies, run:

`npm install`

To start the server, run:

`npm start`

*The server will be listening at localhost on port 3000.*

To run the tests, run:

`npm test`

## API Endpoints

### Customers

#### Get all customers.

`http://localhost:3000/api/v1/customers`

#### Get one customer by uuid.

`http://localhost:3000/api/v1/customers/2a0e62ab-90df-4d32-a831-53217b3b9b58`

### Steps

#### Get all steps for a trip instance by uuid.

`http://localhost:3000/api/v1/steps/5bf46fca-0dd7-4e77-8ec6-f55dbac415ed`

## Dev

To compile everything, run:

`gulp scripts`

*This will transpile all the TypeScript files into JavaScript ES6\. The product of the compilation will live inside a `/dist` folder.*

To watch, run:

`gulp watch`
