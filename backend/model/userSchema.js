const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  fullname: String,
  bio: String,
  imgUrl: String,
  following: Array,
  followers: Array,
  savedStoryIds: Array,
  isNewNotifications: Boolean,
  notifications: Array,
  messages: Array,
})

const User = mongoose.model('user', userSchema)
module.exports = User
