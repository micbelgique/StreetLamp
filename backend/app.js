const env = require('dotenv').config();

const express = require('express');
const app = express();
const bp = require('body-parser')

const mongoose = require('mongoose');

const Alert = require('./models/alert');


// Connection to the DB

mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
   auth: {
     username: process.env.COSMOSDB_USER,
     password: process.env.COSMOSDB_PASSWORD
   },
 useNewUrlParser: true,
 useUnifiedTopology: true,
 retryWrites: false
 
 })
 .then(() => console.log('Connection to CosmosDB successful'))
 .catch((err) => console.error(err));


// CORS Policy for the API

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


// CRUD Operations for the Alerts

// POST
app.post('/api/alert/', (req, res, next) => {
  //delete req.body._id;
  const alert = new Alert({
    ...req.body
  });
  console.log("body" + req.body.deviceID);
  alert.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

// GET ONE
app.get('/api/alert/:id', (req, res, next) => {
  Alert.findOne({ _id: req.params.id })
    .then(alert => res.status(200).json(alert))
    .catch(error => res.status(404).json({ error }));
});

// UPDATE
app.put('/api/alert/:id', (req, res, next) => {
  Alert.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

// DELETE ONE
app.delete('/api/alert/:id', (req, res, next) => {
  Alert.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

//GET ALL
app.use('/api/alerts', (req, res, next) => {
    Alert.find()
      .then(alerts => res.status(200).json(alerts))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;