# Seneca

## Introduction
- Microservices are a style of structuring an application as a collection of loosely tied services. It is a style for continuous delivery of large applications. One of the guiding principles for microservices is "smart endppoints and dumb pipes," meaning that each application may have its own separate and complex internal logic, but each sends information in the same simple format. For instance, two services might be written in different languages but send data in JSON format that both can use.
- Seneca is a Node package for building microservice systems that send information to each other. 
- Seneca uses pattern matching with a few simple methods to sends data from one Seneca service to another. If you are familiar with endpoints and requests, Seneca should start to feel comfortable fairly quickly.

## Install and require
1. Install ```seneca``` with ```npm install```.
    ```sh
    npm install seneca
    ```
1. In each Seneca service, require 'seneca' and invoke, storing the instance in a variable. For example:
    ```js
    const seneca = require('seneca')();
    ```

## Let your services talk

#### add() method
The add() method may remind you of building endpoints. With the add() method, we create a pattern to listen for, similar to the idea of writing endpoint URLs to listen for. We also pass in a callback that accepts the incoming request object as well as a done function.

######      add() pattern 
    The first parameter in our add() is a pattern object. Here is the example from the average.js file from this repo:
        ```js
        {"api": "products", "company": "DM"}
        ```

#### act() method
If the add() methods reminds you of endpoints, the act() method may remind you of making requests to those endpoints. The act() method also takes an object and a callback.