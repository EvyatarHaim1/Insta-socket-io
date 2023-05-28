import moment from "moment";

export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  msToTime,
}

function msToTime(ms) {
  const recordTime = moment(ms).valueOf()
  const currentDate = new Date().getTime()
  const sum = currentDate - recordTime
  if (sum < 60000) {
    const seconds = Math.floor(sum / 1000);
    if (seconds < 2) return `${seconds} second ago`;
    else return `${seconds} seconds ago`;
  }
  if (sum < 3600000) {
    const minutes = Math.floor(sum / 60000);
    if (minutes < 2) return `${minutes} minutes ago`;
    else return `${minutes} minutes ago`;
  }
  if (sum < 86400000) {
    const hours = Math.floor(sum / 3600000);
    if (hours < 2) return `${hours} hour ago`;
    else return `${hours} hours ago`;
  }
  if (sum < 604800000) {
    const days = Math.floor(sum / 86400000);
    if (days < 2) return `${days} day ago`;
    else return `${days} days ago`;
  }
  if (sum < 2629800000) {
    const weeks = Math.floor(sum / 604800000);
    if (weeks < 2) return `${weeks} week ago`;
    else return `${weeks} weeks ago`;
  }
  if (sum > 2629800000) {
    const months = Math.floor(sum / 2629800000);
    if (months < 2) return `${months} month ago`;
    else return `${months} months ago`;
  }
  if (sum > 31556952000) {
    const years = Math.floor(sum / 31556952000);
    if (years < 2) return `${years} year ago`;
    else return `${years} years ago`;
  }
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}


