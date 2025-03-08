const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  printName: {
    type: String,
  },
  openingStockQuantity: {
    type: Number,
    default: 0,
  },
  currentStockQuantity: {
    type: Number,
    default: 0,
  },
  openingStockValue: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
  },
  hsnCode: {
    type: Number,
    required: true,
  },
  taxCategory: {
    type: Number,
    required: true,
  },
  productCategory:{
    type: String,
    enum:['Goods', 'Services'],
    required: true
  },
  groupItem: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItemGroup",
      },
      name: {
        type: String
      }
    }
  ],
  specification:{
    type: Map,
    of: String, // Correcting `off` to `of`
    // required: true, // Map to handle dynamic further sub-category fields
  },
  isActive:{
    type: Boolean,
    default: false
  }, 
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{timeseries: true}
);

module.exports = itemSchema;