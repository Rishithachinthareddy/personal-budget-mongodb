// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs'); //to include the Node.js built-in file system module

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
app.use('/', express.static('public'));

const mongoose = require('mongoose');
const budgetModel = require('./models/budget_schema');

let url = 'mongodb://127.0.0.1:27017/PersonalBudget';

// Connect to the database when the server starts
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((connectionError) => {
        console.log(connectionError);
    });

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get("/budget", (req, res) => {
    // Fetch data from the database
    budgetModel.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.post("/addNewBudget", (req, res) => {
    // Insert new data into the database
    let newData = new budgetModel(req.body);
    newData.save()
        .then(() => {
            res.json(newData);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
