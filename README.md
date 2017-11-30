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

###### add() pattern 

- The first parameter in our add() is a pattern object. Here is the example from the ```average.js``` file from this repo: ```{"api": "products", "company": "DM"}```. Though this README will continue to talk about the pattern as an object, keep in mind that it can also be written as a string: ```'api: products, company: DM'```.
- This pattern can be _anything_. There is no magic to any of these properties except that you are creating a pattern to listen for.
- Maybe you have multiple add() functions that share some parts of their patterns. An incoming message will always prioritize the most specific match. If there are two add() patterns with the same amount of specificity, the incoming message will hit the pattern that comes first alphabetically. For example, ```a: 1, b: 2, c: 3``` wins over ```a: 1, c: 3``` because it has more properties. ```a: 1, b: 2``` and ```a: 1, c: 3``` have the same number of properties, so ```a: 1, b: 2``` wins because it comes first alphabetically.


###### add() callback
- The callback's first parameter defines a variable that represents the incoming request object. We can pull data off that object and perform any kind of logic we need to within our service. Notice the example below from our ```average.js``` file. It calls the entire request object ```products``` and accesses the ```data``` property on it (which happens to store an array of product objects). The code performs the reduce() method on the array, averaging the all the values stored on the ```price``` property of each object. This average is stored in a variable called ```average```.
- The callback's second parameter defines a variable for our done function. We call this funciton add the end of our add() block. The done function accepts parameters for an error and for the response you send back. In our example below, we have a variable called ```average``` which stores a price average. This value is the result of logic our service performed on an incoming message. At the end of the add() block, you will see we called done() and passed that ```average``` variable into the second parameter, sending it back (think of an endpoint calling ```res.send()```).

    ```js
    seneca.add({"api": "products", "company": "DM"}, (products, done) => {
        const average = products.data.reduce((sum, product) => sum + +product.price, 0) / products.data.length;
        done(null, {average});
    });
    ```

#### act() method
If the add() methods reminds you of endpoints, the act() method may remind you of making requests to those endpoints. The act() method also takes an object and a callback.