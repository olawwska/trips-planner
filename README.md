# Trips Planner

Trips Planner is an application for convenient management of your travel ideas. <br> Built using Google API, on backend: Node.js, Express and SQL together with React and Typescript on frontend.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

Trips planner enables you to manage your travel ideas.
To use it, first you need to authenticate with your google account. <br> Then you'll be redirected
to a page with list of cities you would like to visit.




https://github.com/olawwska/trips-planner/assets/47668241/37d052ce-1dea-4d82-8c83-877dcd1da6c1





After clicking on particular city you'll be redirected to the attractions view, where you can add attractions using search and rate them according to your preference. 




https://github.com/olawwska/trips-planner/assets/47668241/b158a47a-c91b-4984-a544-ed4449ae980f





In the future there will be added functionality to invite friends via email to selected lists and plan trips/rate attractions together. 

## Technologies

Project is created with:
* react: 18.2.0
* typescript: 4.9.5
* @mui/material: 5.13.1
* @react-google-maps/api: 2.18.1
* axios: 1.4.0
* react-query: 3.39.3
* react-router-dom: 6.11.2
* express: 4.18.2
* passport: 0.5.3
* passport-google-oauth20: 2.0.0
* sqlite3: 5.1.6
* cookie-session: 2.0.0
* concurrently: 8.1.0


## Setup
To run this project add your API keys to .env files in /frontend and /backend. <br>To create go to [Google Developer Console](https://console.cloud.google.com/) -> Credentials -> Create Credentials -> Select 'API Key' -> Enabled APIs & Services -> Maps JavaScript API, Places API and Geolocation API. -> paste keys to .env in /frontend. <br>Again go to Credentials -> Create Credentials -> OAuth Consent Screen -> OAuth 2.0 Client IDs. Take keys and paste to .env in /backend.

<br>Then install project locally using npm:
<br>`$ cd backend`
<br>`$ npm install`
<br>`$ cd ../frontend`
<br>`$ npm install`
<br>`$ npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
