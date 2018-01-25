const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const o2x = require('object-to-xml');

var database = {
    users: {
        "sebas": {name: "Sebastián", email: "sebasdlhl@gmail.com"},
        "miguel": {name: "Miguel", email: "miguel.mzbi@gmail.com"},
        "default": {name: "Default", email: "default@default.default"}
    }
}

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.route("/xml")
.get((req, res, next) => {
    let data = database.users[(req.query["name"] || "default")];
    res.set('Content-Type', 'text/xml');
    res.send(o2x({
        '?xml version="1.0" encoding="utf-8"?': null,
        data
    }));
});

app.route("/json")
.get((req, res, next) => {
    let returnData = database.users[(req.query["name"] || "default")];
    res.json(returnData);
});

http.createServer(app).listen(8080);