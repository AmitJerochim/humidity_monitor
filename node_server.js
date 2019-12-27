const bodyParser = require("body-parser");
const fs = require('fs');
const http = require('http');
const hostname = '192.168.178.55';
const port = 3000;

let newData='';
let temporalData=[];
let dataArray=[]; 

let getAverage = (array)=>{
   let sorted  = array.sort(function(a,b){return parseInt(a['temp'])-parseInt(b['temp'])});
   let middle = Math.round(sorted.length/2);
   return sorted[middle];
}

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
        newData=body;
        temporalData.push(newData);
        if(temporalData.length>= 20){
           dataArray.push(getAverage(temporalData));
           temporalData=[];
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end();
   });

  }

  if(req.method==='GET' && req.url==="/"){
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/html');
     let path=__dirname+"/view/d3js.html";
     let readStream = fs.createReadStream(path);
     fs.readFile(path, (err, file)=>{
       console.log("sent"); 
       if (err) {console.log(err)};
       if(file){ console.log(file);
       res.write(file);
       res.end();}
    });
  }

  if (req.method==='GET' && req.url==='/data') {
     res.end(dataArray.join());
     //res.end(newData);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
