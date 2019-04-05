var Artist = require('../models/artists');
var Track = require('../models/tracks');
var Album = require('../models/albums');
var ex = require('express');
var router = ex.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); 


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

//Obtenir le nombre d'albums par genre de musique
router.get('/stats/genre/albums', (req, res)=>{
    pop = 0;
    rock = 0;
    country = 0;
    rap = 0;
    
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
        res.json({
            
            'Pop':pop,
            'Rock':rock,
            'Country':country,
            'Rap':rap
        });
    });
});

//Obtenir le nombre de musiques par genre de musique
router.get('/stats/genre/tracks', (req, res)=>{
    pop = 0;
    rock = 0;
    country = 0;
    rap = 0;
    
    Album.find(function(err, albums){
        if (err){
            return res.send(err);
        }

        albums.forEach((album, array)=>{
            if(album.genre == 'Pop'){
                pop += album.tracks.length;
            };
            if(album.genre == 'Rock'){
                rock += album.tracks.length;
            };
            if(album.genre == 'Country'){
                country += album.tracks.length;
            };
            if(album.genre == 'Rap'){
                rap += album.tracks.length;
            };
            
        });
        res.json({
            
            'Pop':pop,
            'Rock':rock,
            'Country':country,
            'Rap':rap
        });
    });
});

//Obtenir le nombre de likes par genre de musique
router.get('/stats/genre/likes', (req, res)=>{
    pop = 0;
    rock = 0;
    country = 0;
    rap = 0;
    
    Album.find(function(err, allalbums){
        if (err){
            return res.send(err);
        }
        musicTot = 0;
        allalbums.forEach((album, array)=>{
            musicTot += album.tracks.length;
            comptMusic = 0;

            Album.findById(album, (err, albums)=>{
                if(err){
                    return res.send(err);
                };
                
                albums.tracks.forEach((song, array)=>{
                    comptMusic += 1;

                    Track.findById(song, (err, track)=>{
                        if(err){
                            return res.send(err);
                        };
                        if(albums.genre == 'Pop'){
                            pop += Number(track.likes);
                            //console.log('pop:' + pop);
    
                        };
                        if(albums.genre == 'Rock'){
                            rock += Number(track.likes);
                            console.log('rock:' + rock);
    
                        };
                        if(albums.genre == 'Country'){
                            country += Number(track.likes);
                            console.log('country:' + country);
    
                        };
                        if(albums.genre == 'Rap'){
                            rap += Number(track.likes);
                            console.log('rap:' + rap);
    
                        };
                        console.log('compt2:'+comptMusic);
                        console.log('music:' + musicTot);
                        if(comptMusic == musicTot){
                            res.json({
                
                                'Pop':pop,
                                'Rock':rock,
                                'Country':country,
                                'Rap':rap
                            });
                        };   
                    });
                }); 
            });
        });
    });
});

module.exports = router;