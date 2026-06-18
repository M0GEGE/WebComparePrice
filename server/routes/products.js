const express = require("express");

const router = express.Router();

const db = require("../database");

// получить все товары

router.get("/", (req,res)=>{

    db.query(
        "SELECT * FROM products",

        (error, result)=>{

            if(error){

                res.status(500).json(error);

            }
            else{

                res.json(result);

            }

        }

    );

});

// добавить товар

router.post("/", (req, res)=>{

    const { name, price } = req.body;

    const sql = 
    "INSERT INTO products (name, price) VALUES (?, ?)";

    db.query(
        sql,
        [name, price],

        (error, result)=>{

            if(error){

                res.status(500).json(error);

                return;
            }

            res.json({

                message: "Товар добавлен",

                id: result.insertId

            });

        }

    );

});

module.exports = router;