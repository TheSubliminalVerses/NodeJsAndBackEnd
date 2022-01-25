// entry point
const PORT = 3000;

const sqlite = require('sqlite3').verbose();
let db = my_database('./api.db');

var express = require("express");
var app = express();

app.get("/products", (req, res) => {
  response_body = {'Hello': 'World'} ;

  res.json(response_body) ;
});

app.listen(PORT);
console.log(`Your Web server should be up and running, waiting for requests to come in. Try http://localhost:${PORT}/products`);