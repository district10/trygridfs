var mongoose = require('mongoose');
var plugin   = require('mongoose-harmony-gridfs');

var profileSchema = mongoose.Schema({
    name: String,
    joinedOn: Date
});

var settings = {
    // These are the keys that will be stored in GridFS
    keys: ['photo', 'thumbnail']
};

profileSchema.plugin(plugin, settings); // Attach GridFS
var Profile = mongoose.model('Profile', profileSchema); // Ready to use GridFS

var user = new Profile() // Has GridFS functionality
