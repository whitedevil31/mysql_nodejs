const express = require("express");
var fs = require("fs");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "../.env" });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "imdereton_55",
  database: "nodejsmysql_database",
});

db.connect((err) => {
  if (err) throw err;
  console.log(" mysql connected");
});

app.get("/", (req, res) => {
  console.log("hiiii");
});
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE testsqldatabase";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send("database created");
//     console.log(result);
//   });
//  });

app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE imgTbale(id int AUTO_INCREMENT,imgData blob,body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("table created dude");
  });
});

app.post("/altertable", (req, res) => {
  let sql = "ALTER TABLE posts ADD imgdata blob NOT NULL";
  let query = db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("success");
    }
  });
});

var img = {
  imgData: fs.readFileSync("C:\\Users\\NANDA\\Desktop\\sqldata.jpg"),
};

app.post("/postimage", (req, res) => {
  //   let sql = "INSERT INTO imgtbale SET ?";
  //   let query = db.query(sql, img, (er, result) => {
  //     if (er) res.send(er);
  //     res.status(201).send({ result });
  //   });
  console.log(img);
});
app.post("/comparison", (req, res) => {
  let sql = "SELECT * from posts WHERE mark >= 35 ";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("success");
  });
});

app.post("/postdata", (req, res) => {
  let data = {
    title: req.body.title,
    body: req.body.body,
    first_name: req.body.first_name,
    mark: req.body.mark,
  };

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
  let newupdate = "nanda";
  let sql = `UPDATE posts SET first_name='${newupdate}' WHERE id=${req.params.id}`;
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
port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
