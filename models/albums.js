var mg = require('mongoose');
var Schema = mg.Schema;

var albumSchema = new Schema({
    title: String,
    release: String,
    genre: String,
    cover_url: String,
    tracks: Array
})

module.exports = mg.model('Album', albumSchema);