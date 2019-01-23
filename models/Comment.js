var mongoose = require("mongoose");

// reference to the Schema constructor
var Schema = mongoose.Schema;

// create a new CommentSchema object
var CommentSchema = new Schema({
  
  title: String,
  
  body: String,

  artID: String,

  date: Date
});

// This creates our model from the above schema, using mongoose's model method
var NewComment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = NewComment;