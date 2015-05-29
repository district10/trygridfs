var fs = require('fs');
var mongoose = require('mongoose');
var mongo = mongoose.mongo; // var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var Grid = require('gridfs-stream');
Grid.mongo = mongo;

MongoClient.connect("mongodb://localhost:27017/imgs", function(err, db) {

    var gfs = Grid(db, mongo); 
    /*
     * options: _id, filename, etc. More at GridStore documentation.
     * gfs.find, gfs.findOne ==> gfs.files.find, gfs.files.findOne
     * gfs.exist
     * remove
     * creatWriteStream, createReadStream
     */

    // var filename = '/etc/issue';
    var filename = 'zhuhai.png';

    // write to GridFS
    // writedemo(filename, gfs);

    // read from GridFS, file metadata
    // readdemo('zhuhai.png', gfs);
    /*
        { _id: 5566e9c402129b2741000001,
            chunkSize: 261120,
            uploadDate: Thu May 28 2015 18:11:16 GMT+0800 (CST),
            length: 95267, // bytes
            md5: '6f72c4c85f99f32e28348de332807c07',
            filename: 'zhuhai.png' }
    */

    // read from GridFS, file
    pipeout('restful.pdf', gfs);

    
    //    db.close();
});




// some funcs
function writedemo(filename, gfs) {

    var writestream = gfs.createWriteStream({ filename: filename });

    writestream.on('close', function(file) {
        console.log(file.filename);
    });

    fs.createReadStream(filename).pipe(writestream);
    
}

function readdemo(filename, gfs) {

    gfs.findOne({ filename: filename }, function (err, file) {
        console.log(file); // null or something
    });

}

function pipeout(filename, gfs) {

    var readstream = gfs.createReadStream({ filename: filename });
    readstream.pipe(process.stdout);

}
