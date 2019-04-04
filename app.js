var ex = require('express');
var bP = require('body-parser');
var mg = require('mongoose');
var albums = require('./routes/albums');
var tracks = require('./routes/tracks');
var artists = require('./routes/artists');
var app = ex();
//var ax = require('axios');

var dbName = 'ProjectDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;
mg.connect(connectionString, {useNewUrlParser:true});

app.use(bP.json());
app.use(bP.urlencoded());
app.use('/api', tracks);
app.use('/api', albums);
app.use('/api', artists);



module.exports = app;
