const express = require('express')
const CreateCollection = require('../Controllers')
const bodyParser = require('body-parser')
const router = express.Router();
const cors = require('cors');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(cors())

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/Create',CreateCollection)


module.exports = router;