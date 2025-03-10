const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { itemSchema } = require("../models/index");

//Connecting To db
const org = "org_ASPL_AAOCA7474M";

const db =
  process.env.MONGO_ATLAS_URI + "/" + org + "?retryWrites=true&w=majority";

const con = async () => {
  const connection = await mongoose.createConnection(db);
  return connection;
};

//Routes
router.get("/getItems", async (req, res) => {
  const orgConnection = await con();
  try {
    const Item = orgConnection.model("Item", itemSchema);
    const response = await Item.find({ isDeleted: false });
    console.log(typeof response);
    res.status(200).json({
      message: "Item list fetched successfully",
      response,
    });
  } catch (error) {
    console.log("Error in getAllItem:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

router.put("/updateItem", async (req, res) => {
  const {images:rimages, description:rdescription, price:rprice} = req.body;

  const rid = req.query.id;

  if (!rid) {
    res.status(404).json({
      message: "ID NOT FOUND",
    });
    return 0;
  }

  let updateArr = {};

  if (rimages) {
    updateArr["images"] = rimages;
  }

  if (rdescription) {
    updateArr["description"] = rdescription;
  }

  if (rprice) {
    updateArr["price"] = rprice;
  }


  const orgConnection = await con();

  try {
    // res.send(req.body._id)
    const Item = orgConnection.model("Item", itemSchema);
    // console.log("in try");

    await Item.findByIdAndUpdate(rid, updateArr);

    // console.log("response");
    res.status(200).json({ message: "Items Updated" });
  } catch (error) {
    res.status(404).json({ error, message: "Not Found" });
  }
});


module.exports = router;
