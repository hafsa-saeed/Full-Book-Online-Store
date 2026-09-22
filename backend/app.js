const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

 /* app.use(
 cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);*/

app.use(cors());

require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/carts");
const Order = require("./routes/order");

// routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Run normally when used locally
if (require.main === module) {
  const port = process.env.PORT || 1000;
  app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
  });
}

module.exports = app;
