const db = require("./../configs/keys_dev").mongoURI;
const mongoose = require("mongoose");
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
