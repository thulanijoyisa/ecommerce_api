const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv/config");
const app = express();

app.use(cors());
app.options('*', cors());

const PORT = 3000; 

const productsRouter = require("./routers/product");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");


const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler); 
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routes
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter)


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    dbName: "ecommerce-db",
  })
  .then(() => {
    console.log("connection is ready");
  })
  .catch((error) => {
    console.log(error); 
  });
 
app.listen(PORT, () => {
  console.log(api);
  console.log(`server is running on the http://localhost:${PORT}`);
});
