var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');      
mongoose.set("strictQuery", false)   // pull information from HTML POST (express4)
 
var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Product = require('./models/product'); // Assuming you have a model defined for product
 
// Get all product data from db
app.get('/api/products', async function(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update product title and price based on _id
app.put('/api/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { title, price } = req.body; // Assuming the request body contains the updated title and price
  
      // Find the product by _id and update its title and price
      const updatedProduct = await Product.findByIdAndUpdate(productId, { title, price }, { new: true });
  
      // Check if the product exists
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// Get a product with ID
app.get('/api/products/:product_id', async function(req, res) {
    try {
        const id = req.params.product_id;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send("Product not found");
        } else {
            res.json(product);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create product and send back all products after creation
app.post('/api/products', async function(req, res) {
    try {
        const product = await Product.create(req.body);
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update product and send back success message
app.put('/api/products/:product_id', async function(req, res) {
    try {
        const id = req.params.product_id;
        const data = req.body;
        await Product.findByIdAndUpdate(id, data);
        res.send('Successfully! Product updated');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a product by id
app.delete('/api/products/:product_id', async (req, res) => {
    try {
        const id = req.params.product_id;
        await Product.findByIdAndRemove(id);
        res.send('Successfully! Product has been Deleted.');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port);
console.log("App listening on port : " + port);
