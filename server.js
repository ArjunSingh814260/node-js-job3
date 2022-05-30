const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://ArjunSingh:EhCymlXmIoRzqhOk@databaseccluster.q75hq.mongodb.net/demo";

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "multipart/form-data");

    if (req.url == "/PostRequest") {
      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        const isEmpty = Object.keys(files).length === 0;
        isEmpty;

        const { firstName, lastName, email, age, city, gender } = fields;

        if (err) {
          res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
          res.end(String(err));
          return;
        } else if (
          !firstName ||
          !lastName ||
          !email ||
          !age ||
          !city ||
          !gender ||
          isEmpty == true
        ) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ fields, files }));
        } else {
          const newName = files.file.originalFilename;
          var oldPath = files.file.filepath;
          var newPath = `./Upload/${newName}`;
          const result = fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("uploaded");
            }
          });

          const data = fields;
          data["imgPath"] = newPath;
          console.log(data);
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            else {
              console.log("user Create");
            }
            var dbo = db.db("mydb");

            dbo.collection("customers").insertOne(data, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ fields, files }));
        }
      });

      return;
    } else if ((req.url = "/getRequest")) {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo
          .collection("customers")
          .find({})
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            db.close();
            return;
          });
      });
    }
  })
  .listen(8000, () => {
    console.log("server start portno 8000");
  });
