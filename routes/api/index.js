
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
                let img = $(element).find('a').find("div.c-entry-box--compact__image").find("img").attr("src");

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
    
};