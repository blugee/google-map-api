# Google Map Api

### Tech

 - Node
 - Google Nearby Search Api

 ### .env

 create .env file and add Following key and values to it

 ```
 SECRET_KEY_GOOGLE=
``` 

### Environment

Google Map Api requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.
 
```
$ node index.js
```
There is two ways to add cities into db

- Direct From Html Form
   After starting server see below url
   http://localhost:8080

- Convert excel file to json [beautifytools.com](https://beautifytools.com/excel-to-json-converter.php)
   - See Sample excel file for reference
   - Put Converted Json data in Places.json file
   - Run node addCities.js file. it will add all cities of json file to db   

#### Things To Do Data Google Api

   CronJob will fetch cities data from db.
it will fetch things to do data from google api and it will store that data and database and also will create json file in countries data(see countries folder)

### Development

Want to contribute? Great! Feel free to open a PR.

License
----

MIT

