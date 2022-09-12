<div align="center">
  <h1>Control Expenses API</h1>
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/janapc/pet-grooming"/>
  <img alt="Language top" src="https://img.shields.io/github/languages/top/janapc/pet-grooming"/>
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/janapc/pet-grooming"/>
  <img alt="CI Janapc Unit" src="https://github.com/janapc/pet-grooming/actions/workflows/tests.yml/badge.svg"/>
</div>
<div align="center">
 <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-requirement">Requirement</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-install">Install</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-target">Target</a>
</div>

## ⭐️ Project

This project is based on my study of Clean Architecture. It is an application to create a new service for a store pet grooming.

The project used 2 databases(MongoDb, PostgresSql) and 2 interfaces(CLI, API) for the consumer can use.

## 📍 Requirement

To run the project use the steps below:

- create a file _.env_ with a variable MONGODBURL(used in the database Mongodb) and a variable POSTGRESDBURL(used in the database PostgresSql) in root project.

If you have Docker installed on your machine, run the command to up the databases:

```sh
docker-compose up --build -d
```

You need to install the nodejs on the machine.

## 🚀 Install

Install dependences:

```sh
$ npm i
```

---

Run API in development:

```sh
$ npm run dev:api
```

This application run in port **3000**.

---

Run CLI in development:

```sh
$ npm run dev:cli
```

example to use the CLI: `npm run dev:cli id=asd123 typeService=BATH sizePet=BIG cpf=568.123.456-19 date=2022-09-12T13:00:00`

## ⚙️ Technologies

- nodejs
- typescript
- docker
- jest
- mongoDb
- postgresSql

## 🎯 Target

- valid CPF ✅
- we do not serve on saturday and sunday and the hours of service are 08 at 18 hours ✅
- Should calculate the total of service with 5% tax on transport and each type of service have a price ✅

<br>
<span align="center">

Made by Janapc 🤘 [Get in touch!](https://www.linkedin.com/in/janaina-pedrina/)

</span>
