const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "listadetarefas",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { deadline } = req.body;
  const { description } = req.body;

  let mysql = "INSERT INTO lista ( name, deadline, description) VALUES (?, ?, ?)";
  db.query(mysql, [name, deadline, description], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { deadline } = req.body;
  const { description } = req.body;

  let mysql =
    "SELECT * from lista WHERE name = ? AND deadline = ? AND description = ?";
  db.query(mysql, [name, deadline, description], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM lista";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { deadline } = req.body;
  const { description } = req.body;
  let mysql = "UPDATE lista SET name = ?, deadline = ?, description = ? WHERE id = ?";
  db.query(mysql, [name, deadline, description, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM lista WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
