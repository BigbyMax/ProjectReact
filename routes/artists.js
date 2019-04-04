var Artist = require('../models/artists');
var Track = require('../models/tracks');
var Album = require('../models/albums');
var ex = require('express');
var router = ex.Router();

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
        console.log(artist.nom);
        console.log(artist.followers);
        console.log(artist.birth);
        console.log(artist.Albums);
        
        //console.log(artist.Albums[0]);
    });
});


//Ici, on récupère le nombre de followers d'un.e artiste
router.get('/artists/:id/followers', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        res.json(artist.followers);
        
        //console.log(artist.Albums[0]);
    });
});

//Ici, on va essayer d'afficher les likes de tous les albums de l'artiste, d'où le chemin /likes
router.get('/artists/:id/likes', (req, res)=>{
    var likes=0;
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        //res.json(artist);    
        console.log(artist.nom);
        console.log(artist.followers);
        console.log(artist.birth);
        //boucle pour parcourir les albums
        artist.Albums.forEach((item, array) => {
            //console.log('album : ' + item);
            Album.findById(item, (err, album) =>{
                if(err){
                    return res.send(err);
                }
                album.tracks.forEach((song, array) =>{
                    //console.log('tracks : ' + song);
                    Track.findById(song,(err, track) =>{
                        if(err){
                            return res.send(err);
                        };
                        console.log(track);
                        likes = likes + Number(track.likes);
                    });
                });
            });
            console.log('Le total de like pour TayTay est de : ' + likes);
            res.json(likes);
            
        });

    });

});

//Ici, on va essayer d'afficher le nombre d'écoute des musiques de tous les albums de l'artiste, d'où le chemin /listenings
router.get('/artists/:id/listenings', async (req, res)=>{
    listenings=0;
    try{
    await Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        //res.json(artist);    
        console.log(artist.nom);
        console.log(artist.followers);
        console.log(artist.birth);
        //boucle pour parcourir les albums
         artist.Albums.forEach((item, array) => {
            //console.log('album : ' + item);
            Album.findById(item, (err, album) =>{
                if(err){
                    return res.send(err);
                }
                album.tracks.forEach((song, array) =>{
                    //console.log('tracks : ' + song);
                    Track.findById(song,(err, track) =>{
                        if(err){
                            return res.send(err);
                        };
                        console.log(track);
                        listenings = listenings + Number(track.listenings);
                        console.log(listenings);
                    });
                });
            });
            
        });
        console.log('Le total d écoutes pour TayTay est de : ' + listenings);
        
    });
    } catch (e){

    }
    res.json(listenings);
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