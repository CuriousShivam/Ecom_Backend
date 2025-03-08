//Including ENV file
require("dotenv").config();

//Importing Core modules
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { itemSchema } = require("./models/index");

// console.log("ITEM",itemSchema)

//Importing Created Modules

//Importing Routes

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

//Middlewares
app.use(express.json());
app.use(cors(corsOptions));

const org = "org_ASPL_AAOCA7474M";

const db =
  process.env.MONGO_ATLAS_URI + "/" + org + "?retryWrites=true&w=majority";

const con = async () => {
  const connection = await mongoose.createConnection(db);
  return connection;
};

//GetItems Routes
app.get("/getItems", async (req, res) => {
  const orgConnection = await con();
  try {
    const Item = orgConnection.model("Item", itemSchema);
    const response = await Item.find({ isDeleted: false }).select(
      "name printName currentStockQuantity productCategory unit isActive specifications description price "
    );
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

//UpdateItems
app.put("/updateItem", async (req, res) => {
  const rimages = req.body.images;
  const rdescription = req.body.description;
  const rprice = req.body.price;
  // const rid = req.body.id;
  const rid = req.query.id;

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

  console.log(updateArr);

  if (!rid) {
    res.status(404).json({
      message: "ID NOT FOUND",
    });
    return 0;
  }
  const orgConnection = await con();

  try {
    // res.send(req.body._id)
    const Item = orgConnection.model("Item", itemSchema);
    console.log("in try");

    const response = await Item.findByIdAndUpdate(rid, updateArr);

    console.log("response");
    res.status(200).json({ message: "Items Updated" });
  } catch (error) {
    res.status(404).json({ error, message: "Not Found" });
  }
});

app.put("/updateItem", async (req, res) => {
  const rimages = req.body.images;
  const rdescription = req.body.description;
  const rprice = req.body.price;
  const rid = req.body.id;

  res.status(200).json({ id: id });

  // let updateArr = {};

  // if (rimages) {
  //   updateArr["images"] = rimages;
  // }

  // if (rdescription) {
  //   updateArr["description"] = rdescription;
  // }

  // if (rprice) {
  //   updateArr["price"] = rprice;
  // }

  // console.log(updateArr)

  // if (!rid) {
  //   res.status(404).json({
  //     message: "ID NOT FOUND",
  //   });
  //   return 0;
  // }
  // const orgConnection = await con();

  // try {
  //   // res.send(req.body._id)
  //   const Item = orgConnection.model("Item", itemSchema);
  //   console.log("in try")

  //   const response = await Item.findByIdAndUpdate(rid,updateArr)

  //   console.log("response")
  //   res.status(200).json({ message: "Items Updated" });
  // } catch (error) {
  //   res.status(404).json({error, message:"Not Found"});
  // }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
