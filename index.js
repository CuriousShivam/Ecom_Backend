//Including ENV file
require("dotenv").config();

//Importing Core modules
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const itemSchema = require("./models/index");

//Importing Created Modules

//Importing Routes

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

//Middlewares
app.use(express.json());
app.use(cors(corsOptions));

const org = "org_ASPL_AAOCA7474M";

const db =
  process.env.MONGO_ATLAS_URI + "/" + org + "?retryWrites=true&w=majority";

console.log(db);

const con = async () => {
  const connection = await mongoose.createConnection(db);
  return connection;
};

//Sample Routes
app.get("/getItems", async (req, res) => {
  const orgConnection = await con();
  try {
    const Item = orgConnection.model("Item", itemSchema);
    const response = await Item.find({ isDeleted : false });
    console.log(typeof response)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
