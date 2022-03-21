import http from "http";
import fs from 'fs';

function doOnRequest(request, response){
  // response.end('Welcome to Twitter');

  
  

    if (request.method === 'GET' && request.url === '/') {
      const indexHtml = fs.readFileSync('./index.html', 'utf-8');
      response.end(indexHtml);
      // fs.createReadStream()

    }
    else if (request.method === 'POST' && request.url === '/sayHi') {
      fs.appendFileSync('./hi_log.tx', 'Somebody said hi.\n');
    
      
    }
    else if (request.method === 'POST' && request.url === '/greeting') {
      // accumulate the request body in a series of chunks
      // code here...
      let body = '';
      request.on('data', chunck => {
          body += chunck ;
      });
      
      request.on('end', () => {
       
        console.log(body);
        fs.appendFileSync('./hi_log.tx', body + '\n');


        if(body.trim() == 'hello'){
          response.end('hello there!');
        }else{
          response.end('the sky');
        }
      });

      
      
    } else if(request.method === 'GET' && request.url === '/style.css'){
      const styleCSS = fs.readFileSync('./style.css', 'utf-8');
      response.end(styleCSS);
    }
    else {
      // Handle 404 error: page not found
      // code here...
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Error: Not Found')
      
    }
  
}

const server = http.createServer(doOnRequest)

server.listen(3000);
