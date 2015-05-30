var fs = require("fs");
var path = require("path");
var fs = require('fs');
var koa = require('koa');
var serve = require('koa-static');
var bodyParser = require("koa-bodyparser");
var Router = require('koa-router');
var router = Router();
var mongoose = require('mongoose');
var mongo = mongoose.mongo; // var mongo = require('mongodb');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

// the app
var app = module.exports = koa();
app.use(serve('./public'));

// the pano img store
var imgs;

// configure
var panourl = 'mongodb://localhost:27017/imgs';

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
   this.body = this.request;
});


app.use(img.routes());

router.get('/router', function *(next) { this.body = 'router'; });
app.use(router.routes()).use(router.allowedMethods());

var panoconn = mongoose.createConnection(panourl);
panoconn.once('open', function () {
    imgs = Grid(panoconn.db);
});

// app switch on~
app.listen(8090);
