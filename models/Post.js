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
              return !!(value || this.image !== 'null');
          },
          message: 'Desciprtion'
      }
  },
  datetime: String,
  image: {
      type: String,
      validate: {
          validator: function(value) {
              return !!(value || this.description);
          }
      },
      message: 'IMAGE'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;