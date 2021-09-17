# Quicargo Truckers

## Overview
A very basic project that demonstrates a basic truck management system. Users can perform the following functions:
* View a list of trucks
* Create, update and delete trucks
* For each truck, view a list of locations
* For each truck, create and update locations
* For each truck, view the most recent `X` locations of the truck on a map, where `X` is a number depicting the number of locations to display on the map.

## Setup
The repository contains two sub-folders: `client` and `server`. Start the servers by completing the following steps:

### Server
* Make a copy of the `.env.template` file, renaming it to `.env`.
* Input the desired values for the following environment variables
```
  SERVER_HOST=
  SERVER_PORT=
  DB_NAME=
  DB_USERNAME=
  DB_PASSWORD=
  DB_HOST=
  DB_DIALECT= # mysql or postgres
```
* Install the project dependencies from the server's directory in terminal: 
```
  yarn install # or npm install
```
* Start the backend server:
```
  gulp start
```

### Client
* You can either make a copy of the `.env` file, renaming it to `.env.local` or directly modify the content of the `.env` file.
* Input the desired values for the environment variables. Note: a Google Maps API key is required to configure the map functionality. You can follow the steps [here](https://developers.google.com/maps/documentation/javascript/get-api-key) to generate an API key. `REACT_APP_SERVER_BASE_URL` must match the `SERVER_HOST` and `SERVER_PORT` set in the server `.env` file. All server request go to the `/api` endpoint.
```
  REACT_APP_SERVER_BASE_URL=    # e.g. http://localhost:9000/api
  REACT_APP_GOOGLE_MAPS_API_KEY=
```
* Install the project dependencies from the client's directory in terminal:
```
  yarn install # or npm install
```
* Start the client server:
```
  yarn start
```
View the application by pointing your browser to `http://localhost:3000`.

## REST API Endpoints

### List Trucks
```
  GET: /trucks
```

### Create a truck
```
  POST: /truck

  Sample payload:
  {
    "data": {
      "model": "LX1234",
      "year": 2021,
      "license_plate": "ABC123DE",
      "current_km": 23.56,
      "max_load": 1000,
      "fuel_type": "Gas"
    }
  }
```

### Update a truck
```
  PUT: /truck

  Sample payload:
  {
    "data": {
      "id": "00da048f-4cf4-48ec-a5c0-92c4722947db",
      "model": "LX1234",
      "year": 2021,
      "license_plate": "ABC123DE",
      "current_km": 23.56,
      "max_load": 1000,
      "fuel_type": "Gas",
      "updated_at": "2021-09-13T14:45:27.367Z",
      "created_at": "2021-09-13T14:45:27.367Z"
    }
  }
```

### Delete a truck
```
  DELETE: /truck/:truckId
```

### List a truck's locations (all locations)
```
  GET: /truck/:truckId/locations
```

### List a truck's `X` recent locations
```
  GET: /truck/:truckId/locations/:totalToDisplay
```

### Create a location for a truck
```
  POST: /location

  Sample payload:
  {
    "location": {
      "latitude": 10.2323,
      "longitude": 7.9324,
      "location_datetime": "2021-08-12T23:44:08.399Z"
    },
    "truck": {
      "id": "00da048f-4cf4-48ec-a5c0-92c4722947db"
    }
  }
```

### Update a truck's location
```
  PUT: /location

  Sample payload:
  {
    "location": {
      "id": "9ad5787f-f9e8-401d-8e11-2d28acbcef58",
      "latitude": 10.2323,
      "longitude": 7.9324,
      "location_datetime": "2021-08-12T23:44:08.399Z",
      "updated_at": "2021-09-12T23:53:38.357Z",
      "created_at": "2021-09-12T23:53:38.346Z",
      "truck_id": "f781cc52-5fa6-4033-b86e-275d14cbac21"
    }
  }
```

## Technologies
* ReactJS (with TypeScript)
* NodeJS (>= 10.20.1) using ExpressJS (with TypeScript)
* MySQL (with Sequelize ORM)
* Google Map
