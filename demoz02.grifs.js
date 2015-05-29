var mongo = require('mongodb');
var Grid = require('gridfs');

var url = 'mongodb://localhost:27017/imgs';
mongo.MongoClient.connect(url, function(err, db) {
  var gfs = Grid(db, mongo); // Grid(db, driver)
/* 
  var f = gfs.fromFile({}, './package.json');
  console.log(f.id);

  f.save(function (err, file) {
    console.log('saved file');
    gfs.readFile({_id: f.id}, function (err, data) {
      console.log('read file: ' + data.toString());
    });
  });
 
  gfs.writeFile({}, 'hello', function (err, file) {
    console.log('wrote to ' + file._id);
  });
*/  
});
 
