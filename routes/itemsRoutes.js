const express = require("express");
const router = express.Router();

//Controllers
const {getItems, updateItem} = require('../controllers/itemsController/itemsControllers')

//Routes
router.get('/getItems', getItems)
router.put("/updateItem", updateItem);

module.exports = router;