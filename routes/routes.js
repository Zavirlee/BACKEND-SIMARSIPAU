const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const Auth = require('../middleware/auth')
const { body, param, validationResult } = require('express-validator');
const { Validation } = require("../validators");

// router.route('/register').post(Validation.register, controller.register)

router.route('/login').post(Validation.login, controller.login)

router.route('/home').post(Auth.verifyToken, controller.home)

router.route('/addArchive').post(Auth.verifyToken, controller.add_archive)

router.route('/createUser').post(Auth.verifyToken, controller.create_user)

router.route('/readUser').post(Auth.verifyToken, controller.read_user)

router.route('/uppdateUser').post(Auth.verifyToken, controller.update_user)

router.route('/deleteUser').post(Auth.verifyToken, controller.delete_user)

router.route('/logout').post(Auth.verifyToken, controller.logout)

// router.route('/profile').post(Auth.verifyToken, controller.profile)

// router.route('/addcart').post(Validation.addcart, Auth.verifyToken, controller.addcart)

// router.route('/checkout').post(Auth.verifyToken, controller.checkout)

// router.route('/removecart').post(Validation.removecart, Auth.verifyToken, controller.removecart)

// router.route('/productlog').post(Auth.verifyToken, controller.productlog)

// router.route('/logout').post(Auth.verifyToken, controller.logout)

// router.route('/discount').post(Validation.discount, controller.discount)

// router.route('/verify').post(Auth.verifyToken, controller.verify)

module.exports = router