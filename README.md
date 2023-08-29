# Air Quality 

This documentation provides details on how to use the Air Quality API to retrieve air quality information for a specific location.


## 📖 Description

Air quality monitoring stations provide owners with air quality data. Stations throughout a city contribute their combined data to provide overall city air quality data.

## 🚀 Features

- 📱 **NestJS** — latest version
- 🎉 **TypeScript** - Type checking
- ⚙️ **Dotenv** - Supports environment variables
- 🏪 **TypeORM** - Database ORM
- 🏪 **PostgreSQL** - Open-Source Relational Database
- 🧠 **Configuration** - Single config for all
- 🐳 **Docker Compose** - Container Orchestration
- 🔐 **Helmet** - secure HTTP headers
- 📏 **ESLint** — Pluggable JavaScript linter
- 💖 **Prettier** - Opinionated Code Formatter
- ✨ **Commitlint** - Lint your conventional commits
- 🕵️‍♂️ **Code Scanning** - Code scanning with CodeQL


## Installation (Development)

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
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e



## Endpoints

<details>
  <summary><code>GET</code> <code><b>/?lat=35.98&lon=140.33&key=your_key</b></code> <code>(gets the air quality by lat,lon)</code></summary>

##### Parameters

> | name   |  type      | data type      | description                                          |
> |--------|------------|----------------|------------------------------------------------------|
> | `lat`  |  required  | string         | The  latitude                                        |
> | `lon`  \  required  | string         | the logitude                                         |
> | `key`  \  required  | string         | the api key ,gotten from IQAir 


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | `{"status": "success","Result": {"pollution": {"ts": "2023-06-09T05:00:00.000Z","aqius": 3, "mainus": "n2","aqicn": 9,"maincn": "n2"}}}`                                                  |
> | `401`         | `application/json`                | `{"status":"incorrect_api_key","message":"Incorrect API key."}`     |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:3004/api/nearest_city?lat=35.98&lon=140.33&key=your_api_key
> ```

</details>




## Improvements
- Add more test 
- improve documentaion on the bonus endpoint to get the date for the most concentarted time of day
- use bullmq instead of the plain schedule module from nest js 

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

