const express = require('express');
const DataLoadController = require('../controllers/DataLoadController');

const router = express.Router();

router.route("/")
    .post(DataLoadController.postData)

module.exports = router;