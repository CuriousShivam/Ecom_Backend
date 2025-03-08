

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