const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const payment = require("./controller/payment");
const order = require("./controller/order");
const couponCodes = require("./controller/coupounCode");

const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config

// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: "backend/config/.env",
//   });
// }

//---------------deployment code---------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully..!!");
  });
}

//routes
app.use("/api/user", user);
app.use("/api/shop", shop);
app.use("/api/order", order);
app.use("/api/product", product);
app.use("/api/event", event);
app.use("/api/coupon", couponCodes);
app.use("/api/payment", payment);

//for error handling
app.use(ErrorHandler);
module.exports = app;
