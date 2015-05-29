var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var fs = require('fs');
var koa = require('koa');

var router = require("koa-router");
//var bodyParser = require("koa-bodyparser");
//var fs = require("fs");
//var path = require("path");



var app = module.exports = koa();
app.use(router(app));

var db = new mongo.Db('imgs', new mongo.Server("127.0.0.1", 27017));

var connect = function(){
    db.open(function (err) {
        if (err) return handleError(err);
        var gfs = Grid(db, mongo);

        // all set!
    });
};
function getfile( filename, ctx ) {
  var readstream = gfs.createReadStream({
      filename: filename
  });

  //error handling, e.g. file does not exist
  readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
  });

  readstream.pipe(ctx.res);
}

//app.use(bodyParser());
app.get("/", function(){
    var ctx = this;
    ctx.body = 'home';
});

app.listen(8090);
