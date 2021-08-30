const UserService = require('../services/UserService');
const express = require('express');
const userRouter = express.Router();
module.exports = userRouter;

userRouter.param('userId', (req, res, next, id) => {

})

//Create new User
userRouter.post('/', (req, res, next) => {
  req.body.username = req.body.username.toLowerCase();
  const userService = new UserService();
  const newUser = userService.createUser(req.body);

  if(newUser){
    return res.status(200).send('user created!');
  }
  return res.status(500).send('Problem creating user!');
})