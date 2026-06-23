const express = require("express");
const router = express.Router();
const db = require("../database");

// Получить все товары
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(result);
    }
  });
});

// Получить товар по id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id = ?", [id], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Товар не найден" });
      return;
    }
    res.json(result[0]);
  });
});

// Добавить товар
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const sql = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(sql, [name, price], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.json({
      message: "Товар добавлен",
      id: result.insertId
    });
  });
});

// Обновить товар
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  const sql = "UPDATE products SET name=?, price=? WHERE id=?";
  db.query(sql, [name, price, id], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.json({ message: "Товар обновлен" });
  });
});

// Удалить товар
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Товар не найден" });
      return;
    }
    res.json({ message: "Товар удален" });
  });
});

module.exports = router;