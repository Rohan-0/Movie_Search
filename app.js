const express = require("express"),
	  app = express(),
	  request = require("request");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
	res.render("search");
});

app.get("/results", function (req, res) {
	var movie = 0;
	var movie = req.query.search;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + movie;
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			if (data.Response == "True") {
				res.render("results", {data: data, movie: movie});
			} else{
				res.render("results", {data: [], movie: 0});
			}
			
		}
	});
});

app.get("/info/:id", function (req, res) {
	var movieId = req.params.id;
	var url = "http://www.omdbapi.com/?apikey=thewdb&i=" + movieId +"&plot=full";
	request(url, function (error, response, body) {
		if(!error && response.statusCode == 200){
			var movie = JSON.parse(body);
			res.render("info", {movie: movie});
		}
	});
});

app.listen(3000, function () {
	console.log("Movie Web App has started!!");
});