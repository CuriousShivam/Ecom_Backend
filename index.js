//Including ENV file
require("dotenv").config();


//Importing Core modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")


//Importing Created Modules
const {itemRoutes} = require("./routes/index")

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};


//Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json())


//Using Routes
app.use('/items', itemRoutes)


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
