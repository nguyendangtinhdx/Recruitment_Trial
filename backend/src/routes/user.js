const router = require('express').Router();

const userController = require('../controllers/User');

router.get('/', userController.loginPage);
router.post('/login', userController.login);
router.get('/logout', userController.loginPage);
router.get('/home', userController.list);
router.post('/add', userController.insert);
router.post('/update', userController.update);
router.get('/delete/:id', userController.delete);
router.get('/search', userController.search);
router.get('/home/:page', userController.list);
module.exports = router;

