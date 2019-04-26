const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
      type: String,
      validate: {
          validator: function(value) {
              return !!(value || this.image);
          },
          message: 'Desciprtion'
      }
  },
  datetime: { type : Date, default: Date.now },
  image: {
      type: String,
      validate: {
          validator: function(value) {
              return !!(value || this.description);
          }
      },
      message: 'IMAGE'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
   count: Number
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;