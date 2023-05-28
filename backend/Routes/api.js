const express = require('express')
const router = express.Router()
const User = require('../model/userSchema')
const Story = require('../model/storySchema')

router.post('/currentUser', async function (req, res) {
  const user = req.body
  console.log(req.body)
  let document = await User.findOne({ username: user.username });
  res.send(document)
})

router.put('/user', async function (req, res) {
  const user = req.body
  try {
    let updatedUser = await User.findOneAndReplace({ id: user.id }, user)
    res.send(updatedUser)
  } catch (error) {
    console.log('Got an error', error)
  }
})

router.get('/users', async function (req, res) {
  let documents = await User.find({})
  res.send(documents)
})

router.post('/users', async function (req, res) {
  try {
    req.body.map((u) => {
      let newUser = new User(u)
      newUser.save().then((data) => {
        // console.log('save data', data)
      })
    })
    res.end()
  } catch (error) {
    console.log('Got an error', error)
  }
})

router.get('/stories', async function (req, res) {
  let documents = await Story.find({})
  res.send(documents)
})

router.post('/stories', async function (req, res) {
  req.body.map((s) => {
    let newStory = new Story(s)
    newStory.save().then((data) => {
      // console.log('save data', data)
    })
  })
  res.end()
})

router.post('/story', async function (req, res) {
  const story = new Story(req.body)
  try {
    story.save().then((data) => {
      // console.log('save data', data)
    })
    res.end()
  } catch (error) {
    console.log('Got an error', error)
  }
})

router.put('/story', async function (req, res) {
  const story = req.body
  console.log('storyyyyyyyyy', req.body.timestamp)
  try {
    let updatedStory = await Story.findOneAndReplace({ id: story.id }, story)
    // console.log('save data', updatedStory)
    res.send(updatedStory)
  } catch (error) {
    console.log('Got an error', error)
  }
})

router.delete('/story', async function (req, res) {
  let id = req.body
  await Story.findByIdAndDelete(id)
  res.end()
})

module.exports = router
