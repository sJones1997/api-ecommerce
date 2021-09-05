const express = require('express');
const userMiddleware = require('../middlewares/userMiddlewares');
const userRouter = express.Router();
module.exports = userRouter;

userRouter.use(userMiddleware)

userRouter.param('userId', async (req, res, next, id) => {
  const userService = req.body.userService;
  let user = await userService.getUserById(id);
  user = JSON.parse(user);
  if(user.length){
    req.body.user = user[0];
    return next();
  } 
  return res.status(404).send('User not found');
})

//Create new User
userRouter.post('/', async (req, res, next) => {
  const decode = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('utf-8');
  console.log(decode)
  req.body.username = req.body.username.toLowerCase();
  const userService = req.body.userService;
  const newUser = await userService.createUser(req.body);
  console.log(newUser)
  if(isNaN(newUser) === false){
    return res.status(200).send('User created!');
  }
  return res.status(500).send('Problem creating user!');
})


userRouter.get('/', async (req, res, next) => {
  const userService = req.body.userService;
  const users = await userService.getAllUsers();
  if(users.length){
    return res.status(200).send(users);
  }
  return res.status(500).send('Unable to find users!')
})

userRouter.get('/:userId', async (req, res, next) => {
  res.status(200).send(req.body.user);
})

userRouter.put('/:userId', async (req, res, next) => {
  const {username, password } = await req.body.userService.updateUser(req.body, req.body.user);
  if(username || password) {
    return res.status(200).send('Details updated successfully');
  }
  return res.status(400).send("Nothing to update");
})

userRouter.delete('/:userId', async (req, res, next) => {
  const userService = req.body.userService;
  const deleteUser = await userService.deleteUser(req.body.user.id);
  if(deleteUser){
    return res.status(200).send("User successfully deleted")
  }
  return res.status(500).send('Unable to delete user')
})