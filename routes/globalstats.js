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

//Obtenir la durée moyenne par genre de musique
router.get('/stats/genre/duration', (req, res)=>{
    pop = 0;
    rock = 0;
    country = 0;
    rap = 0;
    comptPop = 0;
    comptRock = 0;
    comptCountry = 0;
    comptRap = 0;
    timePop = 0;
    timeRock = 0;
    timeCountry = 0;
    timeRap = 0;

    Album.find(function(err, albums){
        if (err){
            return res.send(err);
        }

        albums.forEach((album, array)=>{
            if(album.genre == 'Pop'){
                comptPop += album.tracks.length;
            };
            if(album.genre == 'Rock'){
                comptRock += album.tracks.length;
            };
            if(album.genre == 'Country'){
                comptCountry += album.tracks.length;
            };
            if(album.genre == 'Rap'){
                comptRap += album.tracks.length;
            };
        });
    });
    
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
                    

                    Track.findById(song, (err, track)=>{
                        if(err){
                            return res.send(err);
                        };
                        comptMusic += 1;
                        if(albums.genre == 'Pop'){
                            timePop += Number(track.duration);
    
                        };
                        if(albums.genre == 'Rock'){
                            timeRock += Number(track.duration);
    
                        };
                        if(albums.genre == 'Country'){
                            timeCountry += Number(track.duration);
    
                        };
                        if(albums.genre == 'Rap'){
                            timeRap += Number(track.duration);
    
                        };
                        if(comptMusic == musicTot){
                            tmppop = timePop/comptPop;
                            tmprock = timeRock/comptRock;
                            tmpcountry = timeCountry/comptCountry;
                            tmprap = timeRap/comptRap;

                            pop = Math.floor(tmppop/60) +':'+Math.floor(tmppop%60)
                            rock = tmprock/60 +':'+tmprock%60
                            country = tmpcountry/60 +':'+tmpcountry%60
                            rap = tmprap/60 +':'+tmprap%60
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

//Obtenir le nombre de likes par genre
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
                    

                    Track.findById(song, (err, track)=>{
                        comptMusic += 1;
                        if(err){
                            return res.send(err);
                        };
                        if(albums.genre == 'Pop'){
                            pop += Number(track.likes);
    
                        };
                        if(albums.genre == 'Rock'){
                            rock += Number(track.likes);
    
                        };
                        if(albums.genre == 'Country'){
                            country += Number(track.likes);
    
                        };
                        if(albums.genre == 'Rap'){
                            rap += Number(track.likes);
    
                        };

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

//Obtenir le nombre d écoutes par genre
router.get('/stats/genre/listenings', (req, res)=>{
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
                    

                    Track.findById(song, (err, track)=>{
                        comptMusic += 1;
                        if(err){
                            return res.send(err);
                        };
                        if(albums.genre == 'Pop'){
                            pop += Number(track.listenings);
    
                        };
                        if(albums.genre == 'Rock'){
                            rock += Number(track.listenings);
    
                        };
                        if(albums.genre == 'Country'){
                            country += Number(track.listenings);
    
                        };
                        if(albums.genre == 'Rap'){
                            rap += Number(track.listenings);    
                        };
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