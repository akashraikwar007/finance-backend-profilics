const app = require("./app");
const mongoose = require("mongoose");
const connectDB = require('./config/db');
require("dotenv").config();
connectDB();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port", process.env.PORT)
    );
  })
  .catch((err) => console.log("MongoDB Connection Failed", err));
