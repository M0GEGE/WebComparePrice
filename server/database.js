const mysql = require("mysql2");

// создаём подключение к базе данных

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "5vvX4e_)",

    database: "compare_all"

});

// проверяем подключение

db.connect((error) => {

    if (error) {

        console.log(
            "Ошибка подключения к MySQL"
        );

        console.log(error);

        return;

    }

    console.log(
        "MySQL подключен"
    );

});

// экспортируем подключение

module.exports = db;