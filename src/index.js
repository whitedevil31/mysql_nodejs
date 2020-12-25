const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "testsqldatabase",
});

db.connect((err) => {
  if (err) throw err;
  console.log(" mysql connected");
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE testsqldatabase";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("database created");
    console.log(result);
  });
});

app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("table created dude");
  });
});

app.post("/postdata", (req, res) => {
  let data = { title: req.body.title, body: req.body.body };

  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, data, (err, result) => {
    if (err) throw err;

    res.status(201).send({ result });
  });
});
app.get("/getdatas", (req, res) => {
  let sql = "SELECT * from posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("results showing");
  });
});
app.get("/getsingledata/:id", (req, res) => {
  let sql = `SELECT * from posts WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ result }).json();
  });
});
app.get("/updatesinglepost/:id", (req, res) => {
  let newupdate = "vit is pysc";
  let sql = `UPDATE posts SET title='${newupdate}' WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ result }).json();
  });
});
app.get("/deletesinglepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("deleted da");
  });
});
app.listen(3000, () => {
  console.log("server is up ");
});
