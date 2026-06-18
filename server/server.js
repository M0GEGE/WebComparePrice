const express = require("express");

const cors = require("cors");

const productRoutes =
require("./routes/products");

require("./database");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/products",
    productRoutes
);

app.listen(3000,()=>{

    console.log(
        "Server started on port 3000"
    );

});