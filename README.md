# Storefront Backend Project

## Setup And Connect To The Database

1. Create User On Database
   `CREATE USER admin WITH PASSWORD 'password';`

2. Create Dev Database
   `CREATE DATABASE store_dev;`

   - To Connect
     `\c store_dev`

3. Create Test Database
   `CREATE DATABASE store_test;`

   - To Connect
     `\c store_test`

## Prepare env

- add a `.env` file in the main directory

---

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5433
POSTGRES_DB=**\***
POSTGRES_USER=**\***
POSTGRES_PASSWORD=**\***
BCRYPT_PASSWORD=**\***
TOKEN_SECRET=**\***
SALT_ROUNDS=10

## To Start App

### Run

npm install && npm run start

## To Start Test

### Run

npm run test_db
