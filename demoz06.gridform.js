var mongoose = require('mongoose');
var mongo = mongoose.mongo; // var mongo = require('mongodb');
var gridform = require('gridform');
var koa = require('koa');
var Router = require('koa-router');
var http = require('http');
var assert = require('assert');
var formidable = require('formidable');

var panourl = 'mongodb://localhost:27017/imgs';
var panoconn = mongoose.createConnection(panourl);
panoconn.once('open', function () {
    gridform.db = panoconn.db;
    gridform.mongo = mongo;
    console.log('DB connected.');
});

/*
var app = module.exports = koa();

var upload = new Router({ prefix: '/upload' });
upload.post('/', function *() {
    var ctx = this;
    ctx.body = ctx.request;
    return;
    var form = gridform();
    form.on('fileBegin', function (name, file) {
        // file.metadata = new Date();
    });

    form.parse(ctx.request, function (err, fields, files) {

        var file = files.upload;

        file.name // the uploaded file name
        file.type // file type per [mime](https://github.com/bentomas/node-mime)
        file.size // uploaded file size (file length in GridFS) named "size" for compatibility
        file.path // same as file.name. included for compatibility
        file.lastModified // included for compatibility

        // files contain additional gridfs info
        file.root // the root of the files collection used in MongoDB ('fs' here means the full collection in mongo is named 'fs.files')
        file.id   // the ObjectId for this file

    });
});

app.use(upload.routes());

app.use(function*(){
    this.body = 
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>';
});

app.listen(8080);
*/

var app = http.Server(function (req, res) {


  // create a gridform
  var form = gridform();

  // returns a custom IncomingForm
  assert(form instanceof formidable.IncomingForm);

  // optionally store per-file metadata
  form.on('fileBegin', function (name, file) {
    file.metadata = 'so meta'
  })

  // parse normally
  form.parse(req, function (err, fields, files) {

    // use files and fields as you do today
    var file = files.upload;

    file.name // the uploaded file name
    file.type // file type per [mime](https://github.com/bentomas/node-mime)
    file.size // uploaded file size (file length in GridFS) named "size" for compatibility
    file.path // same as file.name. included for compatibility
    file.lastModified // included for compatibility

    // files contain additional gridfs info
    file.root // the root of the files collection used in MongoDB ('fs' here means the full collection in mongo is named 'fs.files')
    file.id   // the ObjectId for this file

    res.end('hello');
  });
});

app.listen(8000, '127.0.0.1');
