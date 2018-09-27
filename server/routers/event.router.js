const express = require('express');
const controller = require('../controllers/event.controller');
const router = express.Router();

router.get('/getData', controller.getData);
router.post('/postData', controller.postData);

module.exports = router;