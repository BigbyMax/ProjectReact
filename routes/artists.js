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
router.get('/artists', function(req, res){
    console.log('get all artists');
    Artist.find(function(err, artists){
        if (err){
            return res.send(err);
        }
        res.json(artists);
    });
});

//Récupérer les albums d'un.e artiste
router.get('/artists/:id/albums', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        Album.find({"_id" : { "$in" : artist.albums}}, (err, album)=>{
            res.json(album);
        });
    });
});

router.post('/artists', function(req, res){
    console.log('post an artist');
    var artist = new Artist(req.body);
    artist.save(function(err){
        if (err){
            return res.send(err);
        }
        res.send({message: 'Artist added'});
    });  
});

//Ici, on récupère les informations d'un.e artiste
router.get('/artists/:id', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        res.json(artist);
    });
});


//Ici, on récupère le nombre de followers d'un.e artiste
router.get('/artists/:id/followers', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        res.json(artist.followers);
    });
});

//Ici, on va essayer d'afficher les likes de tous les albums de l'artiste, d'où le chemin /likes
router.get('/artists/:id/likes', (req, res)=>{
    likes=0;
    comptMusic = 0;
    nbrMusic = 0;
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }

        //On commence une première boucle pour parcourir la liste des albums
        artist.albums.forEach((item, array) => {
            Album.findById(item, (err, album) =>{
                if(err){
                    return res.send(err);
                }

                //On enregistre le nombre total de musiques pour savoir quand envoyer le résultat (res.json(likes))
                nbrMusic = nbrMusic + album.tracks.length;

                //On commence une seconde boucle pour parcourir la liste des musiques par album
                album.tracks.forEach((song, array) =>{
                    Track.findById(song,(err, track) =>{
                        if(err){
                            return res.send(err);
                        };

                        //On ajoute au compteur de likes la valeur qui se trouve dans chaque musique
                        likes = likes + Number(track.likes);

                        //On incrémente le compteur des musiques
                        comptMusic = comptMusic + 1;

                        //Si le compteur de musiques atteint le nombre total de musiques, on peut retourner le résultat (res.json)
                        if(comptMusic == nbrMusic){
                            console.log('Le total de likes pour TayTay est de : ' + likes);
                            res.json(likes);
                        };
                    });        
                });
            });
        });
    });
});

//Ici, on va essayer d'afficher le nombre d'écoute des musiques de tous les albums de l'artiste, d'où le chemin /listenings
router.get('/artists/:id/listenings', (req, res)=>{
    listenings=0;
    comptMusic = 0;
    nbrMusic = 0;

    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        //boucle pour parcourir les albums
         artist.albums.forEach((item, array) => {
            Album.findById(item, (err, album) =>{
                if(err){
                    return res.send(err);
                }

                //On enregistre le nombre total de musiques pour savoir quand envoyer le résultat (res.json(listenings))
                nbrMusic = nbrMusic + album.tracks.length;

                album.tracks.forEach((song, array) =>{
                    Track.findById(song,(err, track) =>{
                        if(err){
                            return res.send(err);
                        };
                        //On ajoute au compteur d écoutes la valeur qui se trouve dans chaque musique
                        listenings = listenings + Number(track.listenings);

                        //On incrémente le compteur des musiques
                        comptMusic = comptMusic + 1;

                        //Si le compteur de musiques atteint le nombre total de musiques, on peut retourner le résultat (res.json)
                        if(comptMusic == nbrMusic){
                            console.log('Le total d écoutes pour TayTay est de : ' + listenings);
                            res.json(listenings);
                        };
                    });
                });
            });
        });
    });
});

router.put('/artists/:id', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        };
        for(prop in req.body){
            artist[prop] = req.body[prop];
        };
        artist.save((err)=>{
            if(err){
                return res.send(err);
            }
            res.json({message: 'Artiste mis.e à jour'});
        });
    });
});



router.post('/artists/:id/album', function(req, res){
    var album = new Album(req.body);
    album.save(function(err){
        if (err){
            return res.send(err);
        }
        res.send({message: 'Album ajouté'});
    });  
});


router.delete('/artists/:id', (req,res)=>{
    console.log(req.params.id);
        Artist.findByIdAndDelete(req.params.id, (err, artist)=>{
        if(err){
            console.log('its an error');
            return res.send(err);
        }
        res.json({message: 'Artist deleted'});
    });
});

module.exports = router;