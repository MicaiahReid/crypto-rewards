# Getting Started with Crypto-Rewards API

## Install mongodb

Follow the appropriate instructions for your development environment to [install mondodb.](https://docs.mongodb.com/manual/installation/)

## Building locally

Create a `.env` file in the root of the `server` directory with the environment variables detailed below.

```
PORT=3001
MONGODB_URI=mongodb://localhost/crypto-rewards
INFURA_URL=http://localhost:8545/
INITIAL_FUND_ADDRESS=0x
FUND_ADDRESS_PRIVATE_KEY=0x
CONTRACT_ADDRESS=0x
```
Replace the `PORT` with the API Port Number

Replace the `MONGODB_URI` with the MongoDB Connection String

Replace the `INITIAL_FUND_ADDRESS` with the Account Address

Replace the `FUND_ADDRESS_PRIVATE_KEY` with the Private Key

Replace the `CONTRACT_ADDRESS` with the Contract Address

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the API at [http://localhost:3001](http://localhost:3001) 

The server will reload if you make edits.

### `yarn test`

Runs the API tests

### `yarn run seed`

Seed the database