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
        res.json(albums);
    });
});

router.post('/albums', function(req, res){
    var album = new Album(req.body);
    album.save(function(err){
        if (err){
            return res.send(err);
        }
        res.send({message: 'Album added'});
    });  
});


router.get('/albums/:id', (req, res)=>{
    Album.findOne({_id: req.params.id}, (err, album)=>{
        if(err){
            return res.send(err);
        }
        res.json(album);
    });
});

//Date de sortie des albums
router.get('/albums/:id/release', (req, res)=>{
    Album.findOne({_id: req.params.id}, (err, album)=>{
        if(err){
            return res.send(err);
        }
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
        res.json({message: 'Album deleted'});
    });
});


module.exports = router;