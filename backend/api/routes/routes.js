const express = require('express');
const router = express.Router();
const apiController= require('./../controllers/User');
router.get('/users', apiController.getAllUser);
router.delete('/users/:id', apiController.deleteUser);
router.post('/users', apiController.addUser);
router.put('/users/:id', apiController.updateUser);
module.exports= router;