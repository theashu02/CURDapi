import express from "express";
import mongoose from "mongoose";
import Product from "./models/productModel.js";

const app = express();
const PORT = 5000;


// For using and enter data in post man in json format
//  if you put data in post man in url format then you will use urlencoded to false
app.use(express.json());

// to try server is running or not
app.get("/", (req, res) => {
  res.send("welcome");
});

// if you write await during fatching data then
// you also write async in the req,res position 
// (due to mongoose interaction with database)


//To Find all the Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// To Find a Single Product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//To Update the Product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndUpdate(id, req.body);
    if (!products) {
      return res
        .status(400)
        .json({ message: `cannot find product with ID ${id}` });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//To Add the Product
app.post("/products", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


//To Delete Product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndDelete(id, req.body);
    if (!products) {
      return res.status(400).json({ message: `cannot find product with ID ${id}` });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// this is when stricTquery shows in terminal
// mongoose.set('strictQuery',false);
//CONNECT THE SERVER TO DATA BASE
mongoose.connect("mongodb+srv://clusname:password@cluster0.esaprlv.mongodb.net/")
.then(() => {
  console.log("connected to server");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log(error);
});
