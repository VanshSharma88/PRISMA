// const {PrismaClient} = require('./generated/prisma') // giving error as i am using nondemon in every file not global 

// Import Prisma Client library
const { PrismaClient } = require('@prisma/client');

// Create a new instance of PrismaClient to interact with the database
const prisma = new PrismaClient();

// Import Express.js for building API routes
const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // (body-parser is built into Express)

// CREATE product
app.post('/products', async (req, res) => {
    try {
        // Create a new product in the database using request body
        const result = await prisma.product.create({
            data: req.body  // expects {name, price, inStock} in request body
        });
        res.status(200).json({ message: 'Item added successfully', product: result });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
    } 
});

// READ all products read all products to the database and it 
app.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const data = await prisma.product.findMany();
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
    }
});

// DELETE a product by id
app.delete('/products/:id', async (req, res) => {
    try {
        // Delete product where id matches the one from URL params
        const data = await prisma.product.delete({
            where: { id: parseInt(req.params.id) } // convert id to integer

        });
        res.status(200).json({ message: 'Product deleted successfully', data: data });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong on the server', error: err.message });
    }
});

// UPDATE product
app.put('/products', async (req, res) => {
    try {
        // Update product details based on id
        const data = await prisma.product.update({
            where: { id: req.body.id },   // find product by id
            data: { name: req.body.name } // update only name (can extend for price, inStock, etc.)
        });
        res.status(200).json({ message: 'Product updated successfully', data: data });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong... ${error.message}` });
    }
});
app.post("/products",async(req,res)=>{

})

// Start the server on port 3000
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
