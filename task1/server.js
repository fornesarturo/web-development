const PORT = process.env.PORT || 8080;

var http = require('http');
var fs = require("fs");
var mongoURL = process.env.MONGOLAB_URI;

var mLab = require('mongolab-data-api')('oQbIzLHtooOzykPrjE-Zqw9N-dnzCSvt');

/*
mLab.listCollections('task1-web', function (err, collections) {
	console.log(collections); // => [coll1, coll2, ...]
});
var options = {
	database: 'task1-web',
	collectionName: 'task1data',
	documents: { "TeamName": "Notioli" }
};
mLab.insertDocuments(options, function(){});*/

http.createServer(function(request, response) {

	if(request.url === "/index"){
		sendFileContent(response, "index.html", "text/html");
	}
	else if (request.url === "/title") {
		var options = {
			database: 'task1-web',
			collectionName: 'task1data',
		};
		mLab.listDocuments(options, function (err, collections) {
			console.log(collections);
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(collections[0].TeamName);
		});
	}
	else if(request.url === "/"){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Saluton!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpeg");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}

}).listen(PORT, () => {
  console.log('Server listening on: http://localhost:%s', PORT);
});

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}