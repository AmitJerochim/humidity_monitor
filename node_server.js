const http = require('http');
const bodyParser = require("body-parser");

const hostname = '127.0.0.1';
const port = 3000;

let newData='';
const server = http.createServer((req, res) => {
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
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end(newData);
  }

  if (req.method==='GET' && req.url==='/data') {

  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
