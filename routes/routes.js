const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const Auth = require("../middleware/auth");
const { body, param, validationResult } = require("express-validator");
const { Validation } = require("../validators");

// router.route('/register').post(Validation.register, controller.register)

router.route("/login").post(Validation.login, controller.login);

router.route("/home").post(controller.home);

router.route("/dashboardData").post(controller.dashboardData);

router.route("/catalogData").post(controller.catalogData);

router.route("/terbaru").post(controller.terbaru);

router.route("/category").post(controller.archive_by_category);

router.route("/addArchive").post(Auth.verifyToken, controller.add_archive);

router.route("/archiveDetail").post(controller.archiveDetail);

router
  .route("/updateArchive")
  .post(Auth.verifyToken, controller.update_archive);

router.route("/detailUser").post(controller.detail_user);

router.route("/createUser").post(controller.create_user);

router.route("/readUser").post(controller.read_user);

router.route("/uppdateUser").post(controller.update_user);

router.route("/deleteUser").post(controller.delete_user);

router.route("/logout").post(Auth.verifyToken, controller.logout);

router.route("/verify").post(Auth.verifyToken, controller.verify);

module.exports = router;
