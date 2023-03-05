const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/upload')

router.post('/register', userController.register);

router.post('/login', userController.login);



router.put('/upload/image/:id', authMiddleware, upload.array('images'), productController.updateProductImage);



module.exports = router;
