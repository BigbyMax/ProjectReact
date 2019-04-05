var Artist = require('../models/artists');
var Track = require('../models/tracks');
var Album = require('../models/albums');
var ex = require('express');
var router = ex.Router();


//Pour afficher toutes les entrées de la BDD
router.get('/stats', (req, res)=>{
    console.log('get all stats');
    Artist.find(function(err, artists){
        if (err){
            return res.send(err);
        }
        res.json(artists);
    });
});

//Pour afficher toutes les entrées de la BDD
router.get('/stats/genre', (req, res)=>{
    pop = 0;
    rock = 0;
    country = 0;
    rap = 0;
    console.log('get all stats');
    Album.find(function(err, albums){
        if (err){
            return res.send(err);
        }
        albums.forEach((album, array)=>{
            if(album.genre == 'Pop'){
                pop += 1;
            };
            if(album.genre == 'Rock'){
                rock += 1;
            };
            if(album.genre == 'Country'){
                country += 1;
            };
            if(album.genre == 'Rap'){
                rap += 1;
            };
            
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({
            
            'Pop':pop,
            'Rock':rock,
            'Country':country,
            'Rap':rap
        });
    });
});


module.exports = router;