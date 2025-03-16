const { con, findItems, findItemByIdAndUpdate } = require("./service");

const getItems = async (req, res) => {
  try {
    const orgCon = await con();
    const response = await findItems(orgCon);
    res.status(200).json({ message: "Items Fetched", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while fetching Items", error });
  }
};

const updateItem = async (req, res) => {
  try {
    //Request Credentials
    const rid = req.query.id;
    if (!rid) {
      return res.status(404).json({
        message: "ID NOT FOUND",
      });
    }

    let updateArr = {};

    const {
      images: rimages,
      description: rdescription,
      price: rprice,
    } = req.body; 
    

    if (rimages) {
      updateArr["images"] = rimages;
    }

    if (rdescription) {
      updateArr["description"] = rdescription;
    }

    if (rprice) {
      updateArr["price"] = rprice;
    }

    const orgCon = await con();
    await findItemByIdAndUpdate(orgCon, rid, updateArr);
    res.status(200).json({ message: "Items Updated" });
  } catch (error) {
    res.status(404).json({ error, message: "Not Found" });
  }
};

module.exports = {
  getItems,
  updateItem,
};
