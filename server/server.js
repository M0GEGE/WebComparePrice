const express = require("express");
const path = require("path");


const app = express();


app.use(
    express.json()
);



// frontend

app.use(
    express.static(
        path.join(__dirname, "../pages")
    )
);




// Главная

app.get("/",(req,res)=>{


    res.sendFile(

        path.join(
            __dirname,
            "../pages/main.html"
        )

    );

});




// Compare

app.get("/compare",(req,res)=>{


    res.sendFile(

        path.join(
            __dirname,
            "../pages/compare.html"
        )

    );

});




// Price

app.get(
[
    "/price",
    "/price.html"
],
(req,res)=>{


    res.sendFile(

        path.join(
            __dirname,
            "../pages/price.html"
        )

    );


});





// API

const productsRouter =
require("./routes/products");


app.use(
    "/products",
    productsRouter
);





const PORT =
process.env.PORT || 3000;



app.listen(
PORT,
()=>{


console.log(
"Server started on port " + PORT
);


});