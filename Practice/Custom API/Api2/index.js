const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"application/json"});
    fs.readFile(`${__dirname}/data.json`,"utf-8",(err,data)=>{
        console.log(data);
        res.end(data);
    });
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("listening on 8000");
})