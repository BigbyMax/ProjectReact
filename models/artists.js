var mg = require('mongoose');
var Schema = mg.Schema;

var artistSchema = new Schema({
    nom: String,
    birth: String,
    followers: String,
    albums: Array
});

module.exports = mg.model('Artist', artistSchema);