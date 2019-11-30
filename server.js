const express = require('express')
var formidable = require('formidable');
const fs= require('fs');
const bodyParser = require('body-parser') //requiring body parser 

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });
  
  function checkDirectory(directory, callback) {  
    fs.stat(directory, function(err, stats) {
      //Check if error defined and the error code is "not exists"
      if (err && err.errno === 34) {
        //Create the directory, call the callback.
        fs.mkdir(directory, callback);
      } else {
        //just in case there was a different error:
        callback(err)
      }
    });
  }
app.get('/', function (req, res){
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
    //destination folder for uploaded files
    let uploadPath='c:/Prasad/uploads/'
    var form = new formidable.IncomingForm();
    fs.stat(uploadPath, function(err, stats) { 
        if(err) {res.status(400).send('folder doesnot exists'); return}
    });
try{
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = uploadPath + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.status(402).send("file uploaded successfully");
    });

 } catch(error){
     console.error(error);
    res.status(400).send('No files were uploaded.');
 }
});
  
process.on('uncaughtException', (err, origin) => {
    console.error(err.message)
  });
  
  process.on('SIGINT', (error, origin) => {
    console.error(error.message)
    //Notification code when application process is killed
   });

app.listen(3000, () => console.log('server started'))