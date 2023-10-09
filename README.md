<p align="center">
  <br>
  <b>Trending Node App</b>
  <br>
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```


## Running the app with Docker

```bash
To start service containers based on the `docker-compose.yaml` file, just call 
docker-compose up -d
```
## Test

```bash
# authorization
$ curl --location --request POST 'http://localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "PHPSESSID": "<your session id>"
}'


# balance
$ curl --location --request GET 'http://localhost:3000/balance'


# log-out (remove PHPSESSID from db)
$ curl --location --request POST 'http://localhost:3000/auth/log-out'
```

