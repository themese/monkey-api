## Description

This project was created using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
This is a CRM project for a technical interview. We wanted to treat this as a real production project, so from now on all the documentation will be written as this project was production-ready. There will be explanation for the decisions taken.

If you are not part of the company that is interviewing, thanks for comming around and feel free to contribute and share any ideas on how to improve it. We can all use this to improve ourselves.

**TL/DR**: You need `NPM` and `Docker`, as well as the environmental variables set in your `.env` file. Run `npm install` then `npm run db:start` and `npm run db:init` and you are good to go.

## Requirements to run this project

- [Node](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# start database
$ npm run db:start

# init database
$ npm run db:init

# seed database
$ npm run db:seed

# format code
$ npm run lint
```

## Test

ToDo - no tests buillt at the time this is written but planned to be done.
Tests are done using jest. Only unit tests are implemented for the sake of time.

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Framework

NestJS is a progressive Node.js framework that helps build server-side applications, that extends Node.js frameworks like Express or Fastify adding modular organization. The framework is DDD-friendly, Event sourced, and offers microservice architecture. It is lightweight, simple, and open source. It also helps development with many features for building and deploying enterprise services quickly and following the principles of SOLID and 12-factor applications.

It also fits perfectly with Onion architecture, which makes it a prime candidate framework for a fully fledged production-ready project.

[Also Typescript](https://st2.depositphotos.com/2024219/8328/i/950/depositphotos_83286870-stock-photo-happy-monkey-man-holding-a.jpg).

## Architecture

The project has been built following the Onion Architecture (OA for reference). You can learn more [here](https://www.codeguru.com/csharp/understanding-onion-architecture/).  
Thanks to how easy is to implement OA in NestJS, we can swap a lot of implemented functionality quickly, even removing whole layers.
For example, we could remove the Data Access Layer (repository implementations) for a tool like Prisma. We could even abstract it more with GraphQL and Prisma and forget about models and implementations.

See the link provided for all advantages and disadvantages, but for me, that is the best advantage. However, it comes with some costs, and, outside the extra time it usually takes to decide the folder structure, it's a pattern that makes it harder for beginners and new joiners to the porject to understand. Some times even experts, as architects might mess up splitting responsabilities between layers, due to how fine the line is between some of them at times.

## CRM

This CRM is built with Users, Roles and Customers. Every User can CRUD Customers, but only Users with the admin Role can CRUD Users. Only roles can be fully deleted via API; both Users and Customers have a `isDeleted` boolean flag that represents a softDelete.

### Roles

```typescript
# TS
class Role {
  id: number; // DB sequential id - primary key
  name: string; // name of the role. Currently we assume that admin users will have their role name as 'admin'
}
```

You can find the Roles in `[public].[Roles]`.

### Users

```typescript
# TS
class User {
  id: number; // DB sequential id - primary key
  email: string; // User email - unique key
  roleId: number; // Foreign key to Roles DB
  isDeleted: boolean; // Soft delete flag
}
```

You can find the Roles in `[public].[Users]`.

### Admins

The only difference between an Admin User and a Non Admin User is that their Role id FK matches the Role with the name 'admin'. Only an admin can list and modify Users.

### Customers

```typescript
# TS
class Customer {
  id: number; // DB sequential id - primary key
  name: string;
  surname: string;
  photo: string; // Stringified photo. The API will save it automatically in the DB, so send the photo already transformed as base64
  createdBy: number; // Foreign key to Users - this is the User that created the Customer
  lastUpdatedBy: number;  // Foreign key to Users - this is the last User that modified the Customer. CreatedBy and LastUpdatedBy will have   the same value at Customer creation time.
  isDeleted: boolean; // Soft delete flag
}
```

You can find the Roles in `[public].[Customers]`.

## Authentication

We didn't want to build our own Authentication service as dealing with encrypting passwords and managing it in our DB would be costly in time and provide little to no value over using a 3rd party one.

Auth0 was implemented as our authentication service. You can find in the `.env.example` file the required Auth0 ids. These ids aren't shared for security reasons, so please reach out to `jousema.fernandez@gmail.com` if you need these keys.
Auth0 is one of the most consumed authentication services and we are able to automatically allow social login using Google as well as protect using JWT and more, with minimal effort.

### Auth Guards

We protect our controllers routes using `@UseGuards(AuthGuard('jwt'))`. See for example the `health.controller.ts`:

```typescript
@UseGuards(AuthGuard('jwt'))
  @Get('/auth')
  checkAuth(): string {
    return this.healthService.checkAuth();
  }
```

NestJS AuthGuards provide an easy way of protecting our API for unauthorized users and will automatically either allow access to the code or deny access and throw an Unauthorized error. See that we didn't code any error thrown.

The `'jwt'` param in the `AuthGuard('jwt')` decorator refers to `ioc/jwt/jwt.strategy.ts` that uses the `Passport strategy` built in from NestJS and is connected to our Auth0 account. This was done following [Auth0's documentation](https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-role-based-access-control/) and using a [Passport strategy](http://www.passportjs.org/packages/passport-jwt/).

In a nutshell, you will need to send a Authorization token bearerto consume our controllers.

### How to get a Token.

Because this is only the API and we have no UI to login and in order to save time, we are currently login this API using the Application Test features from Auth0. This way, we can skip a Login Page, however this means the token doesn't come from a registered user, so we are skipping a security layer.

![](./public/imgs/auth0.png)

This should be already set up and no config is needed from devs. You can retrieve a token calling the `GET: http://localhost:8000/api/auth` endpoint.

## API Documentation

We use [Swagger for NestJS](https://docs.nestjs.com/openapi/introduction). Go to this URL: `localhost:8000/api` to retrieve the API usage documentation.

You can also find the postman api collection at [this public link](https://www.getpostman.com/collections/d596b43d0825391b8901). You can copy it and Import it in [Postman using Link](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman).

## DB

We use PostgreSQL with Docker (you can install Docker [here](https://docs.docker.com/desktop/#download-and-install)).
Once you have installed Docker and restarted your machine, you can use `npm run db:start`.
This script executes `docker compose` that will create a `PostgreSQL` volume with a user and a password provided via `.env`. You can check them in. `.env.example` and ask them to `jousema.fernandez@gmail.com`. It will also create a db called `dev` and a pgAdmin volume that you can access using the credentials from the `.env` file and in url `localhost:5050`.

Once you are in pgAdmin, you will have to connect to the postgres server we just created.

Go to left menu, right click on Register, then go to Server... and a pop up will appear.

![](./public/imgs/right_click.png)

On the pop up, introduce the following values on the General tab:

![](./public/imgs/register_server.png)

and the following on Connection tab:

![](./public/imgs/register_server_connection.png)

where the `Username` field corresponds to `POSTGRES_USER` in `.env` fiel and Password, `POSTGRES_PWD`.

Now, the DB is set up, but empty. You can run `npm run db:init` to create the tables and `npm run db:seed` to add a few dummy customers, users and admins if you want. This can be useful to test using fake data in the UI, isntead of tests.
