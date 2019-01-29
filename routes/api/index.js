
module.exports = function (app, axios, cheerio, db) {

    // get route for scraping from theverge
    app.get("/scrape", (req, res) => {

        axios.get("https://www.theverge.com/tech").then((response) => {

            var $ = cheerio.load(response.data);
            var test = 'test';
            // finding each article based on verge formatting
            $("div.c-entry-box--compact--article").each(function (i, element) {
                let result = {};

                let link = $(element).find("a").attr("href").split(",")[0].split(" ")[0];
                let title = $(element).find("div.c-entry-box--compact__body").find("h2").text();
                let postDate = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span").has("time").text().replace(/^\s+|\s+$/gm, '');
                let date = $(element).find("div.c-entry-box--compact__body").find("div.c-byline").find("span").has("time").children().attr("datetime");
                let imgraw = $(element).find('a').find("div.c-entry-box--compact__image").find("noscript").text();
                let img = imgraw.slice(17, (imgraw.length -2));

                // building object for DB push
                result.title = title;
                result.link = link;
                result.img = img;
                result.day = postDate;
                result.date = date;

                // pushing object to DB

                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err)
                });
            });
            res.send(200, "success");
        });
    });
//   app.get("/scrape/:id", (req, res) => {
//       axios.get()
//   }); 

// Route for getting all Articles from the db
app.get("/articles:start", (req, res) => {
    // Grab every document in the Articles collection
    console.log(req.params.start);
    let offset = parseInt(req.params.start);
    db.Article.find({}).sort({datefield: -1}).skip(offset).limit(20)
      .then(function(dbArticle) {
        //   console.log(dbArticle + "^test");
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
//   Rout to scrape a specific article
  app.get("/scrape/:body", (req, res) => {
    // 
    let query = ((req.params.body).split('_')).join('/');
    
    let queryURL = `https://www.theverge.com/${query}`
    console.log(query);

    axios.get(queryURL).then((response) => {

        var $ = cheerio.load(response.data);
        let articleBody = ""
        $("div.c-entry-content").children('p').each(function (i, element) {
            articleBody = articleBody + "/" + $(element).text()
            
        })
        db.Article.findOneAndUpdate({link: queryURL}, {body: articleBody}, { new: true }).then(addbody => {
            // console.log("update: " + addbody);
            // sending new obejct to the router
            
            let id = addbody.id;
         
             res.send(addbody);

        }).catch(err => console.log(err))

        return (500)
        
    });
  });

  app.get("/article/:id", (req, res) => {
   
    db.Article.findOne({_id: req.params.id}).then((article) =>{
       
        res.json(article);

    }).catch(err => res.json(err));
       
        
        
  });
  app.post("/comment/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Comment.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  app.get("/comments/:id", (req, res) => {
      let id = req.params.id;

      db.Comment.find({artID: id}).then(data => res.json(data)).catch(err => console.log(err));
  })
};
