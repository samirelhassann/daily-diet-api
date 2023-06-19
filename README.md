# daily-diet-api

A daily diet api created using Nodejs + Typescript + SOLID principles  

This is a project used for study purposes only • [Samir El Hassan](https://github.com/samirelhassann)


## Language and Tools

<p align="left"> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

## Additional Libraries

- fastify
- prisma
- zod
- vitest

## Instalation

Install all the packages

```bash
yarn install
```

Generate the prisma typescript and generate the local databse

```bash
yarn prisma generate && yarn prisma migrate dev
```

## Usage

create a .env file following the values on .env.example, after that run:

```bash
yarn dev
```

## Test

Unit tests:

```bash
yarn test
```

## Business Rules

- [X] It should be possible to create a user
- [X] It must be possible to identify the user among the requests
- [X] It must be possible to register a meal made, with the following information:
    - [X] Name
    - [X] Description
    - [X] Data and Time
    - [X] Is on or off the diet
- [X] It should be possible to list all meals of a user
- [X] It should be possible to visualize a single meal
- [X] It must be possible to delete a meal
- [X] It must be possible to edit a meal
- [X] It should be possible to retrieve a user's metrics
    - [X] Total number of registered meals
    - [X] Total number of meals within the diet
    - [X] Total amount of off-diet meals
    - [X] Best sequence of meals within the diet
- [X] User can only view, edit and delete meals which he created
