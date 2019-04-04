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

//Ici, on va essayer d'afficher les likes de tous les albums de l'artiste, d'où le chemin /likes
router.get('/artists/:id/likes', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        res.json(artist);
        var albumID = artist.Albums[0];
        console.log(albumID);
        Album.findById(albumID, (err, album)=>{
            if(err){
                return res.send(err);
            }
            var trackID = album.tracks[0];
            console.log(album.title);

            Track.findById(trackID, (err, track)=>{
                if(err){
                    return res.send(err);
                }
            console.log(track.title);
            });
    
            
        });

        
        console.log(artist.nom);
        console.log(artist.followers);
        console.log(artist.birth);
        console.log(artist.Albums);
        
        //console.log(artist.Albums[0]);
    });
});

//Ici on récupère les informations d'un.e artiste
router.get('/artists/:id', (req, res)=>{
    Artist.findOne({_id: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        res.json(artist);    
        console.log(artist.nom);
        console.log(artist.followers);
        console.log(artist.birth);
        //boucle pour parcourir les albums
        artist.Albums.forEach((item, array) => {
            console.log(item);
            
        });
    });
});


//A essayer
router.get('/artists/:artist', (req, res)=>{
    console.log(req.params);
    Artist.findOne({artist: req.params.id}, (err, artist)=>{
        if(err){
            return res.send(err);
        }
        res.json(artist);
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