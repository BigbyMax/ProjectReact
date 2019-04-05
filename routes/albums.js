var Album = require('../models/albums');
var Track = require('../models/tracks');
var ex = require('express');
var router = ex.Router();

//Pour afficher toutes les entrées de la BDD
router.get('/albums', function(req, res){
    Album.find(function(err, albums){
        if (err){
            return res.send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(albums);
    });
});

router.post('/albums', function(req, res){
    var album = new Album(req.body);
    album.save(function(err){
        if (err){
            return res.send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send({message: 'Album added'});
    });  
});

//On affiche les information d'un album en particulier
router.get('/albums/:id', (req, res)=>{
    Album.findOne({_id: req.params.id}, (err, album)=>{
        if(err){
            return res.send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(album);
    });
});

//Récupérer le nombre de likes générés par un album
router.get('/albums/:id/likes', (req, res)=>{
    var likes=0;
    comptMusic = 0;
    nbrMusic = 0;
    Album.findOne({_id: req.params.id}, (err, album)=>{
        if(err){
            return res.send(err);
        }
        //On enregistre le nombre total de musiques pour savoir quand envoyer le résultat (res.json(likes))
        nbrMusic = album.tracks.length;

        //On commence une boucle pour parcourir la liste des musiques dans l'album
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
                    console.log('Le total de likes pour l album est de : ' + likes);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.json(likes);
                };
            });        
        });
    });
});

//Récupérer le nombre d'écoutes total d'un album
router.get('/albums/:id/listenings', (req, res)=>{
    var listenings=0;
    comptMusic = 0;
    nbrMusic = 0;
    Album.findOne({_id: req.params.id}, (err, album)=>{
        if(err){
            return res.send(err);
        }
        //On enregistre le nombre total de musiques pour savoir quand envoyer le résultat (res.json(listenings))
        nbrMusic = album.tracks.length;

        //On commence une boucle pour parcourir la liste des musiques dans l'album
        album.tracks.forEach((song, array) =>{
            Track.findById(song,(err, track) =>{
                if(err){
                    return res.send(err);
                };

                //On ajoute au compteur de likes la valeur qui se trouve dans chaque musique
                listenings = listenings+ Number(track.listenings);

                //On incrémente le compteur des musiques
                comptMusic = comptMusic + 1;

                //Si le compteur de musiques atteint le nombre total de musiques, on peut retourner le résultat (res.json)
                if(comptMusic == nbrMusic){
                    console.log('Le total d ecoutes pour l album est de : ' + listenings);
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.json(listenings);
                };
            });        
        });
    });
});

//Date de sortie d'un album en particulier
router.get('/albums/:id/release', (req, res)=>{
    Album.findOne({_id: req.params.id}, (err, album)=>{
        if(err){
            return res.send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(album.release);
    });
});

router.delete('/albums/:id', (req,res)=>{
    console.log(req.params.id);
        Album.findByIdAndDelete(req.params.id, (err, album)=>{
        if(err){
            console.log('its an error');
            return res.send(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({message: 'Album deleted'});
    });
});


module.exports = router;