var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// A GET route for scraping the hardtimes website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://thehardtimes.net").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.headline = $(this)
                .children("div.post-header").children("h2").children("a")
                .text();
            result.summary = $(this)
                .children("div.post-content").children("p").text();
            result.url = $(this)
                .children("div.post-header").children("h2").children("a").attr("href")
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log("ERROR!!: ", err);
                });

        });

    });
    // Send a message to the client
    res.send("Scrape Complete");
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticles) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbArticle);
        var hbsObject = {
            articles: dbArticles
          };
          console.log("hb object-dbArticles: ", dbArticles)
          res.render("index", hbsObject);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
