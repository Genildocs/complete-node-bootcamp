const fs = require("fs");
const http = require("http");
const url = require("url");


//SERVER
const tempOvierview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-overview-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObjt = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // OVERVIEW PAGE
    if (pathName === "/" || pathName === "/overview") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(tempOvierview);

    // PRODUCT PAGE   
    } else if (pathName === "/products") {
        res.end("Page products");

    // API    
    } else if (pathName === "/api") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(data);

    // NOT FOUND PAGE
    } else {
        res.writeHead(404, {
            "content-type": "text/html",
        });
        res.end("<h1>Erro 404 <br> Page not found</h1>");
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Servidor ouvindo na porta 3000");
});
