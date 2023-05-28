const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
  id: String,
  timestamp: Date,
  txt: String,
  postImg: Array,
  by: {
    id: String,
    fullname: String,
    userImg: String,
  },
  comments: [
    {
      timestamp: { type: Date, required: true },
      id: String,
      by: {
        id: String,
        fullname: String,
        imgUrl: String,
      },
      txt: String,
      likedBy: [],
    }
  ],
  likedBy: Array,
  tags: Array,
})

const Story = mongoose.model('story', storySchema)
module.exports = Story
