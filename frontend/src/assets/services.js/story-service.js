import { storageService } from '../services.js/async-storage.service.js'
import { utilService } from '../services.js/util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'storyDB'

export const storyService = {
  query,
  getById,
  remove,
  create,
  update,
}

export const newStory = {
  id: null,
  timestamp: null,
  txt: '',
  postImg: [], //Can be an array if decide to support multiple imgs
  by: {
    id: '',
    fullname: '',
    userImg: '',
  },
  comments: [],
  likedBy: [],
  tags: [],
}

const gStories = [
  {
    id: 's101',
    timestamp: new Date().getTime(),
    txt: 'Best trip ever',
    postImg: [
      'https://i.pinimg.com/474x/fe/bb/63/febb6397ebc186d9d0910d05d8fc28af.jpg',
      'https://res.cloudinary.com/dsinv9pik/image/upload/v1674992159/324925483_746086793599887_2422444401539407282_n_x1var0.jpg',
      'https://res.cloudinary.com/dsinv9pik/image/upload/v1674988394/325913754_1048696716095856_6968959291050052233_n_xjxeb9.jpg',
    ], //Can be an array if decide to support multiple imgs
    by: {
      id: 'Z580',
      fullname: 'Ulash Ulashi',
      userImg: 'https://img.mako.co.il/2014/02/24/467424241_g.jpg',
    },

    comments: [],
    likedBy: [],
    tags: ['fun', 'kids'],
  },
  {
    id: 's102',
    timestamp: new Date().getTime(),
    txt: 'Nice!',
    postImg: ['https://i.insider.com/58936e390849ec1a008b4619?width=700'], //Can be an array if decide to support multiple imgs
    by: {
      id: 'u102',
      fullname: 'Lea Di',
      userImg: 'https://tinyurl.com/bddwcp58',
    },
    comments: [],
    likedBy: [],
    tags: ['fun', 'kids'],
  },
  {
    id: 's103',
    timestamp: new Date().getTime(),
    txt: 'Great pic!',
    postImg: ['https://shorturl.ac/79odv'], //Can be an array if decide to support multiple imgs
    by: {
      id: 'u103',
      fullname: 'Eli Mor',
      userImg: 'https://randomuser.me/api/portraits/men/71.jpg',
    },

    comments: [],
    likedBy: [],
    tags: ['fun', 'kids'],
  },
]

async function query() {
  let stories
  try {
    stories = await httpService.get('stories')
    if (!stories?.data.length) {
      stories = gStories
      httpService.post('stories', stories)
    }
    return stories.data
  } catch (err) {
    console.log('Had Error', err)
  }
}

function getById(storyId) {
  return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
  try {
    await httpService.delete('story', storyId)
  } catch (error) {
    console.log('Had Error', error)
  }
}

async function create(story) {
  let savedStory = await httpService.post('story', story)
  return savedStory
}

async function update(story) {
  try {
    let savedStory = await httpService.put('story', story)
    return savedStory
  } catch (err) {
    console.log('Had Error', err)
  }
}
