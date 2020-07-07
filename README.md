# WeatherApp w/ React, Redux and React-router

WeatherApp built w/ ReactJS, Redux (w/ redux-thunk), react-router, node-sass and Blueprint.js.
Data is pulled from the [AccuWeather API](https://developer.accuweather.com).

## Demo:
You can try the demo hosted on my Github Pages in the following [link](https://5haw4.github.io/shawn-weather-app-05-07-2020).

![Main Page Screenshot](https://github.com/5haw4/shawn-weather-05-07-2020/blob/master/screenshot.JPG?raw=true)

## Features:
- Get weather based on your geo-location
- Dark mode is available
- Use celsius or fahrenheit
- Use your own AccuWeather API Key (it'll be saved in a cookie and will be used instead of the app's API Key)
- Add favorite locations
- Search for locations and see their current weather and 5 days forcast
- Main page logic: 
    - If can get geo-location (browser supports & user gives permission)
        - Loading geo-location weather
    - Else loading Tel-Aviv's weather by default

## Libraries:
- [redux](https://www.npmjs.com/package/redux) - state container
- [react-redux](https://www.npmjs.com/package/react-redux) - binder for react and redux
- [redux-thunk](https://www.npmjs.com/package/redux-thunk) - async actions support for redux (redux middleware)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - frontend navigation
- [node-sass](https://www.npmjs.com/package/node-sass) - SCSS support
- [blueprint.js](https://blueprintjs.com/) - lightweight UI library
- [create-react-app](https://www.npmjs.com/package/create-react-app) - quick start boilerplate for SPA in ReactJS

## Project Structure:
    .
    ├── ...
    ├── public
    ├── src
    │   ├── components      //reusable components
    │   ├── pages           //all the pages in the web app
    │   ├── store
    │   │   ├── actions     //redux actions
    │   │   └── reducers    //redux reducers
    │   ├── styles
    │   │   ├── components  //component specific styles
    │   │   └── index.scss  //root style included in all pages
    │   ├── utils           //utils for the app, like consts, cookies helper functions etc...
    │   ├── App.js
    │   └── index.js
    └── ...

## Quick Start
1. Run ```npm install``` to install the dependencies
2. Run ```npm start``` to start the development server
3. Go to ```localhost:3000``` and browse the WeatherApp web app
