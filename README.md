# trygridfs

Try some GridFS

### Demos

```
.
├── demoz00.native.js
├── demoz01.grifs-locking-stream.js
├── demoz02.grifs.js
├── demoz03.koa-mongo.js
├── demoz04.mongoose-harmony-gridfs.js
├── demoz05.gridfs-stream.js
├── LICENSE
├── node_modules
├── package.json
├── public
└── README.md
```


### Best Ones

* [Koa&Mongo](demoz03.koa-mongo.js)



### cURL


➜  trygridfs git:(master) ✗ curl -X POST -F file=@./package.json localhost:8090/gridfs 
{"method":"POST","url":"/gridfs","header":{"user-agent":"curl/7.35.0","host":"localhost:8090","accept":"*/*","content-length":"1022","expect":"100-continue","content-type":"multipart/form-data; boundary=------------------------72fd612aa595d9d6"}}%                                                                                                                           ➜  trygridfs git:(master) ✗ curl -X POST -d @./package.json localhost:8090/gridfs 
{"method":"POST","url":"/gridfs","header":{"user-agent":"curl/7.35.0","host":"localhost:8090","accept":"*/*","content-length":"783","content-type":"application/x-www-form-urlencoded"}}%➜  trygridfs git:(master) ✗ 

