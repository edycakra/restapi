const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authentication);

router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
