var friendsData = require("../data/friends");





module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

 app.post("/api/friends", function(req, res) {
    res.json(friendsData);
  });//This will be used to handle incoming survey results. 
 //This route will also be used to handle the compatibility logic.

}