const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const MongoClient = require("mongodb").MongoClient;
const { ObjectID, ObjectId } = require("bson");
const uri =
  "mongodb+srv://aprilsell:139843aprilsell@cluster0.nh97s.mongodb.net/april?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("april").collection("product");
  app.post("/addproduct", (req, res) => {
    const newProduct = req.body;
    collection.insertOne(newProduct);
  });
  app.get("/getproduct", (req, res) => {
    collection.find().toArray((err, documents) => {
      res.send(documents);
    });
  });
  app.get("/product/:id", (req, res) => {
    collection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });
  app.post("/addorder", (req, res) => {
    const newProduct = req.body;
    collection.insertOne(newProduct);
  });
  app.get("/getorder/:id", (req, res) => {
    console.log(req.params.id);
    collection.find({ userEmail: req.params.id }).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
