var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ImageSchema = new Schema({
    name: String,
    url: String,
    width: Number,
    height: Number,
    imageData: String,
});
var Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
