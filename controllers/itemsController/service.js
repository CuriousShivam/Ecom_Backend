const mongoose = require("mongoose");
const { itemSchema } = require("../../models/index");

//Connecting To db
const org = "org_ASPL_AAOCA7474M";
const db =
  process.env.MONGO_ATLAS_URI + "/" + org + "?retryWrites=true&w=majority";


const con = async () => {
  return await mongoose.createConnection(db);
};

//Arguments = DB Connection
const findItems = async (orgCon) => {
  const Items = orgCon.model("Item", itemSchema);
  return Items.find({ isDeleted: false });
};

//Agruments = DB Connection, product object id, [ Images array, price, Description ] 
const findItemByIdAndUpdate = (orgCon, id, updateArr) => {
  const Item = orgCon.model("Item", itemSchema);
  return Item.findByIdAndUpdate(id, updateArr);
};

module.exports = { con, findItems, findItemByIdAndUpdate}

