var mongoose = require("mongoose");

// reference to the Schema constructor
var Schema = mongoose.Schema;

// create a new AricleSchema object

var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
 
  link: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: false
  },

  img: {
      type: String,
      required: false
  },
  day: {
      type: String,
      required: false
  },

  date: {
      type: Date,
      required: false
  },

  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// This creates our model using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
