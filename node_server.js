const bodyParser = require("body-parser");
const fs = require('fs');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

let newData='';

const server = http.createServer((req, res) => {
if(/^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString())){
   sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}
 
function sendFileContent(res, fileName, contentType){
  fs.readFile(fileName, function(err, data){
    if(err){
      res.writeHead(404);
      res.write("Not Found!");
    }
    else{
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
    }
    res.end();
  });
}
  if(req.method==='POST'){
     let body = '';
     req.on('data', function(data){
	body += data;
        console.log(body)
        newData=body;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end();
   });

  }

  if(req.method==='GET' && req.url==="/"){
     console.log("Data:" + newData)
     console.log("dirname:" + __dirname)
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/html');
     let path=__dirname+"/view/index.html";
     console.log("path:" + path)
     let readStream = fs.createReadStream(path);
     fs.readFile(path, (err, file)=>{
       console.log("sent"); 
       if (err) {console.log(err)};
       if(file){ console.log(file);
       res.write(file);

       res.end();}
    });
     //readStream.pipe(res);
     // res.sendFile(newData);
  }

  if (req.method==='GET' && req.url==='/data') {

  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
