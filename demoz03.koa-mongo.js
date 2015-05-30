var assert = require('assert');
var fs = require("fs");
var util = require('util');
var path = require("path");
var fs = require('fs');
var koa = require('koa');
var serve = require('koa-static');
var bodyParser = require("koa-bodyparser");
var Router = require('koa-router');
var router = Router();
var gridform = require('gridform');
var formidable = require('formidable');
var mongoose = require('mongoose');
var mongo = mongoose.mongo; // var mongo = require('mongodb');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var bodyParser = require('koa-bodyparser');

// the app
var app = module.exports = koa();
app.use(serve('./public'));


//app.use(formidable);
app.use(bodyParser());

// the pano img store
var imgs;
var gform;

// configure
var panourl = 'mongodb://localhost:27017/imgs';
var panoconn = mongoose.createConnection(panourl);
panoconn.once('open', function () {
    imgs = Grid(panoconn.db);
    gridform.db = panoconn.db;
    gridform.mongo = mongo;
    gform = gridform();
    console.log('DB connected.');
});
// route sites
var sites = new Router();
sites.get('/', function *(next) { this.body = 'all sites'; });
sites.get('/:id', function *(next) { this.body = 'site#' + this.params.id; });

// TODO: route floors, links, etc

// pack these routes
var api = new Router({ prefix: '/api' });
api.get('/site/:id', sites.routes()); // /api/site/:id

// use the API router
app.use(api.routes());

var img = new Router({ prefix: '/gridfs' });
img.get('/:id', function *() {
    this.body = imgs.createReadStream({ filename: this.params.id });
    this.body.pipe(this.res);
});
img.post('/', function*() {
   // var form = gridform();
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    assert(form instanceof formidable.IncomingForm);
//    assert(gform instanceof formidable.IncomingForm);

//    this.body = this.request;
    form.uploadDir = __dirname + '/uploaded';

    form
    .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
    })
    .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
    })
    .on('end', function() {
        console.log('-> upload done');
        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received fields:\n\n '+util.inspect(fields));
        // res.write('\n\n');
        // res.end('received files:\n\n '+util.inspect(files));
    });
    form.parse(this.request);
   
   this.body = this.request;
});

app.use(img.routes());

router.get('/router', function *(next) { this.body = 'router'; });
app.use(router.routes()).use(router.allowedMethods());


// app switch on~
app.listen(8090);
