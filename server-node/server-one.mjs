import http from 'http';

const server = http.createServer((req, res) => {
    console.log("ok");
    res.end('votre page home');
});


server.listen(3000);