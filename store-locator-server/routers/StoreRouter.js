const express = require('express');
const StoreController = require('../controllers/StoreController')
const router= express.Router();

router.route('/')
    .get(StoreController.getAllStores)
    .post(StoreController.postStoreData)

module.exports = router;