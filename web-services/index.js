const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const o2x = require('object-to-xml');
const mongoURL = "mongodb://santaclosdemo:santaclospass@ds113648.mlab.com:13648/santoclos-demo"
const mLab = require('mongolab-data-api')('oQbIzLHtooOzykPrjE-Zqw9N-dnzCSvt');

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

    let data;

    var optionsDB = {
        database: 'santoclos-demo',
        collectionName: 'database',
    };
    mLab.listDocuments(optionsDB, function (err, collections) {
        data = database.users[(req.query["name"] || "default")];
    });

    res.set('Content-Type', 'text/xml');
    res.send(o2x({
        '?xml version="1.0" encoding="utf-8"?': null,
        data
    }));
});

app.route("/json")
.get((req, res, next) => {
    let returnData;

    var optionsDB = {
        database: 'santoclos-demo',
        collectionName: 'database',
    };
    mLab.listDocuments(optionsDB, function (err, collections) {
        returnData = database.users[(req.query["name"] || "default")];
    });
    res.json(returnData);
});

http.createServer(app).listen(8080);