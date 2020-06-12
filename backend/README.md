# BugTracker REST API

Rest API built whit NodeJS, Express and Sequelize.

## Setup

First let's clone the repository and install the dependencies.

Use the following commands:

```bash
git clone https://github.com/Syntax73/bugtracker.git
cd bugtracker
yarn install
```

> NOTE: you can use npm instead of yarn

Now you need to create the `.env` file, in this file we put all environment variables.

Use the command:

```bash
cd backend
cp .env.exemple .env
```

Then you need edit the variables

```
APP_KEY=YOURAPPSECRET //In this field, we specify the key used to generate JWT Tokens
DB_DIALECT=postgres //Here we put which databse will be used (postgres, mysql, sqlite)
DB_HOST=127.0.0.1 //Port used by the databse
DB_USER=USERNAME //User with access to the databse
DB_PASS=PASSWORD //User Password
DB_NAME=DATABASE //The databse name
```

## Database

After create the `.env` file with all the variables, you can create the database with the name you specified in `DB_NAME`, then you can run the migrations.

In the backend folder run this command:

```bash
yarn sequelize db:migrate
```

Now let's populate the database with some fictional data.

```bash
yarn sequelize db:seed
```

> NOTE: you can use npm instead of yarn

## Server

After all this process you can finally start the server, just use the following command:

```bash
yarn dev
```

> This command will start the server in development mode

To test if the server is working, use a rest client like Postman or Insomnia, make a post request to the `localhost:3000/session` passing email and password that are indicated in the json below, if the response include the user data and a JWT token then you're ready.

```json
{
  "email": "admin@adm.com",
  "password": "qwe123"
}
```
