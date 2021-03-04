# StarWarsApi

REST Api created for fetching data from `https://swapi.dev/`.

## How It Works
During the registration process the app draws one hero from `https://swapi.dev/` and assigns to your account. You can get information about your character: 
- homeworld
- films
- species 
- vehicles
- starships 

You can also get resources using a specific `id` but you only have permission to resources that are assigned to your character. For example: If your character comes from homeworld `id:1`, you can't fetch information about homeworld `id:2`.

## Test this api in the production mode 
#### https://lucasapp.pl/

## Technologies
  - Node.js + Express + TypeScript 
  - MongoDB 
  - Redis (session storage + request cache)
  - Docker
  - Nginx
  - PM2
  - Certbot
 
## Prerequisites
- `docker` and `docker-compose`
- `SMTP` server

## Setup
1. Download repository
2. Provide `.env` file for `api` based on `.env.api.example` file
3. Provide `.env` file for `docker` based on `.env.docker.example` file
4. Provide `app.conf` file for nginx
5. Run `npm run up` from main directory
6. If you are running this app for the first time, please customise and run `init-letsencrypt.sh` script as sudo from `docker` dir (generating certificates)
7. To stop app run `npm run down` from main directory

## API

Method    | URI                         | Middleware        | Description
:-------- | :----------------           | :---------        | :---------
GET       | /                           | -                 | home
POST      | /user/register              | guest             | registration
POST      | /user/login                 | guest             | login
POST      | /user/logout                | auth              | logout
POST      | /user/password/forgot       | guest             | sending the reset link
POST      | /user/password/submit       | guest             | the confirmation of the new credentials when resetting the password
GET       | /user/email/verify          | guest             | email verification during the registration
POST      | /user/email/resend          | guest             | resending a verification email
GET       | /starwars/people/me         | auth              | fetching all details for your character
GET       | /starwars/films/me          | auth              | fetching all the movies for your character
GET       | /starwars/films/{id}        | auth              | fetching the movie
GET       | /starwars/species/me        | auth              | fetching all the species for your character
GET       | /starwars/species/{id}      | auth              | fetching the species
GET       | /starwars/vehicles/me       | auth              | fetching all the vehicles for your character
GET       | /starwars/vehicles/{id}     | auth              | fetching the vehicle
GET       | /starwars/starships/me      | auth              | fetching all the starships for your character
GET       | /starwars/starships/{id}    | auth              | fetching the starship
GET       | /starwars/planets/me        | auth              | fetching all the planets for your character
GET       | /starwars/planets/{id}      | auth              | fetching the planet


## Predefined user
You can use the predefined user to test this application.
  - `email` : test@swapi.com
  - `password` : Test123$

## Postman
Using `Postman` for sending requests is highly recommended. You can find the postman config file in the `postman` directory.


## CURL
Detailed request config when using curl:

#### HOME
```sh
curl https://lucasapp.pl/
```

```sh
curl https://lucasapp.pl/ --cookie \
'sid=...'
```

#### REGISTER
```sh
curl -X POST https://lucasapp.pl/user/register -H 'Content-Type: application/json' -d \
'{"email":"...","name":"...","password":"...","passwordConfirmation":"..."}'
```

#### LOGIN
```sh
curl -v -X POST https://lucasapp.pl/user/login -H 'Content-Type: application/json' -d \
'{"email":"...","password":"..."}'
```

#### LOGOUT
```sh
curl -X POST https://lucasapp.pl/user/logout --cookie \
'sid=...'
```

#### FORGOT PASSWORD
```sh
curl -X POST https://lucasapp.pl/user/password/forgot -H 'Content-Type: application/json' -d '{"email":"..."}'
```

#### SUBMIT NEW PASSWORD
```sh
curl -X POST 'https://lucasapp.pl/user/password/submit?id=...&token=...' \
-H 'Content-Type: application/json' -d '{"password":"...","passwordConfirmation":"..."}'
```

#### VERIFY EMAIL
```sh
curl -v 'https://lucasapp.pl/user/email/verify?id=...&token=...&expires=...&signature=...'
```

#### RESEND EMAIL
```sh
curl -X POST https://lucasapp.pl/user/email/resend -H 'Content-Type: application/json' -d '{"email":"..."}'
```

#### ME
```sh
curl https://lucasapp.pl/starwars/people/me --cookie \
'sid=...'
```

#### FILMS
```sh
curl https://lucasapp.pl/starwars/films/me --cookie \
'sid=...'
```

```sh
curl https://lucasapp.pl/starwars/films/{id} --cookie \
'sid=...'
```

#### SPECIES
```sh
curl https://lucasapp.pl/starwars/species/me --cookie \
'sid=...'
```

```sh
curl https://lucasapp.pl/starwars/species/{id} --cookie \
'sid=...'
```

#### VEHICLES
```sh
curl https://lucasapp.pl/starwars/vehicles/me --cookie \
'sid=...'
```

```sh
curl https://lucasapp.pl/starwars/vehicles/{id} --cookie \
'sid=...'
```

#### STARSHIPS
```sh
curl https://lucasapp.pl/starwars/starships/me --cookie \
'sid=...'
```

```sh
curl https://lucasapp.pl/starwars/starships/{id} --cookie \
'sid=...'
```

#### PLANETS
```sh
curl https://lucasapp.pl/starwars/planets/me --cookie \
'sid=...'
```

```sh
curl https://lucasapp.pl/starwars/planets/{id} --cookie \
'sid=...'
```



## INCOMING DATA FORMAT

#### ME
```js
name: string;
height: number | string;
mass: number | string;
hair_color: string;
skin_color: string;
eye_color: string;
birth_year: string;
gender: string;
homeworld: number;
films: number[];
species: number[];
vehicles: number[];
starships: number[];
```

#### FILMS
```js
title: string;
episode_id: number;
opening_crawl: string;
director: string[];
producer: string[];
release_date: string;
characters: number[];
planets: number[];
starships: number[];
vehicles: number[];
species: number[];
```

#### SPECIES
```js
name: string;
classification: string;
designation: string;
average_height: number;
hair_colors: string[];
skin_colors: string[];
eye_colors: string[];
average_lifespan: number | string;
homeworld: number;
language: string;
people: number[];
films: number[];

```

#### VEHICLES
```js
name: string;
model: string;
manufacturer: string;
cost_in_credits: string | number;
length: string | number;
max_atmosphering_speed: string | number;
crew: string | number;
passengers: string | number;
cargo_capacity: string | number;
consumables: string;
vehicle_class: string;
pilots: number[];
films: number[];

```

#### STARSHIPS
```js
name: string;
model: string;
manufacturer: string;
cost_in_credits: string | number;
length: string | number;
max_atmosphering_speed: string | number;
crew: string | number;
passengers: string | number;
cargo_capacity: string | number;
consumables: string;
hyperdrive_rating: string | number;
MGLT: string | number;
starship_class: string;
pilots: number[];
films: number[];
```

#### PLANETS
```js
name: string;
rotation_period: number | string;
orbital_period: number | string;
diameter: number | string;
climate: string[];
gravity: string;
terrain: string[];
surface_water: number | string;
population: number | string;
residents: number[];
films: number[];
```

*Notice that, data from general endpoints (`/me`) always come as array but data from specific endpoints (`/{id}`) come as singular object.*

## Security

### Email Confirmation

- activation link
  - expires in 12h
  - signed with HMAC SHA256
- user email
  - hashed with SHA1

### Password Reset

- reset token
  - pseudo-random string of 80 hex chars
  - signed with HMAC SHA256 before storing in DB
  - expires in 1h

## Cache Mechanism 

Every request sent to external apis is cached with redis. (by default 24h)
