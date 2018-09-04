const express = require('express');
const path = require('path');
const passport = require('passport');
const { constants } = require('./config/constants');
const mysql = require('./config/mysql');
const middleware = require('./utils/middleware');
const Routes = require('./modules');
const logger = require('./config/winston');
/**
 * *Description: Setup Middleware
 */
const app = express();
middleware(app);
app.use(passport.initialize());
/**
 * *Description: Setup Router Backend
 */
var cont_name = process.env.HOSTNAME;
app.use('/api', Routes);
app.get('/', function(req, res) {
  res.status(200).send("Welcome to our Boilerplate restful API!:)" + cont_name);
});
/**
 * *Description: Setup Router Frontend
 */
const images = path.join(__dirname, 'public');
app.use('/', express.static(images));
/**
 * *Description: Setup Listening Server
 */
mysql.sequelize.sync({ force: false })
  .then(() => {
    app.listen(constants.PORT, (err) => {
      if (err) {
        throw err;
      } else {
        logger.log('info', 'Database Connection Has Been Established Successfully. !');
        logger.log('info', `${process.env.NODE_ENV} running with port: ${constants.PORT}`);
      }
    });
  })
  .catch((error) => logger.log('error', 'Unable to connect to the database:', { error }));

