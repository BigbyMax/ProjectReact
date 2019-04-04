var mg = require('mongoose');
var Schema = mg.Schema;

var trackSchema = new Schema({
    title: String,
    duration: String,
    listenings: String,
    likes: String,
    featuring: Array
});

module.exports = mg.model('Track', trackSchema);