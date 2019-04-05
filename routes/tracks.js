var Track = require('../models/tracks');
var ex = require('express');
var router = ex.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); 

//Pour afficher toutes les entrées de la BDD
router.get('/tracks', function(req, res){
    Track.find(function(err, tracks){
        if (err){
            return res.send(err);
        }
        res.json(tracks);
    });
});

router.post('/tracks', function(req, res){
    var track = new Track(req.body);
    track.save(function(err){
        if (err){
            return res.send(err);
        }
        res.send({message: 'Track added'});
    });  
});



router.get('/tracks/:id', (req, res)=>{
    Track.findOne({_id: req.params.id}, (err, track)=>{
        if(err){
            return res.send(err);
        }
        res.json(track);
    });
});

router.get('/tracks/:id/likes', (req, res)=>{
    Track.findOne({_id: req.params.id}, (err, track)=>{
        if(err){
            return res.send(err);
        }
        res.json(track.likes);
    });
});

router.get('/tracks/:id/listenings', (req, res)=>{
    Track.findOne({_id: req.params.id}, (err, track)=>{
        if(err){
            return res.send(err);
        }
        res.json(track.listenings);
    });
});

router.put('/tracks/:id', (req, res)=>{
    Track.findOne({_id: req.params.id}, (err, track)=>{
        if(err){
            return res.send(err);
        };
        for(prop in req.body){
            track[prop] = req.body[prop];
        };
        track.save((err)=>{
            if(err){
                return res.send(err);
            }
            res.json({message: 'Musique mise à jour'});
        });
    });
});

router.delete('/tracks/:id', (req,res)=>{
    console.log(req.params.id);
        Track.findByIdAndDelete(req.params.id, (err, track)=>{
        if(err){
            console.log('its an error');
            return res.send(err);
        }
        res.json({message: 'Track deleted'});
    });
});


module.exports = router;