var mongo = require('mongodb');
var Grid = require('gridfs-locking-stream');

// create or use an existing mongodb-native db instance.
// for this example we'll just create one:
var db = new mongo.Db('yourDatabase', new mongo.Server("127.0.0.1", 27017));

// make sure the db instance is open before passing into `Grid`
db.open(function (err) {
  if (err) return handleError(err);
  var gfs = Grid(db, mongo);  // Use the default GridFS root collection "fs"

  // all set!
})

function handleError() {
    
}
