const { Router } = require('express');
const Users = require('./users/users');
const Posts = require('./posts/posts');

const routes = new Router();
routes.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token, X-Refresh-Token');
  next();
});
routes.use('/users', Users);
routes.use('/posts', Posts);

module.exports = routes;

