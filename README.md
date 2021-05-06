## HasibuApp
A sample POS application made with NodeJs, Express and MongoDb

[![Build Status](https://travis-ci.com/j0nimost/HasibuApp.svg?branch=main)](https://travis-ci.com/github/j0nimost/HasibuApp)
### To Start

- Create a free Mongodb on [mlab](https://mlab.com/) then use the `sample.config.env` to fill in the Database connection string. 
Rename the `sample.config.env` to `config.env` or create a new one.

- RUN `npm install` on the root folder

- RUN `npm start` and access the APIs on port :3110

### APIs
- `/api/v1/auth/signup`
- `/api/v1/auth/signin`
- `/api/v1/stores`
- `/api/v1/catalogues`
- `/api/v1/invoices`
- `/api/v1/payment`
- `/api/v1/account`
* Access the respective endpoints in the `api-routes` folder

### Author
John Nyingi