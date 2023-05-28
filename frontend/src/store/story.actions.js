import {
  SET_STORIES,
  UPDATE_STORY,
  REMOVE_STORY,
  ADD_STORY,
  OPEN_CREATE_MODAL,
  CLOSE_CREATE_MODAL,
  OPEN_REMOVE_MODAL,
  CLOSE_REMOVE_MODAL,
  OPEN_STORY_FORWARD_MODAL,
  CLOSE_STORY_FORWARD_MODAL,
  UPDATE_CURRENT_STORY,
  UPDATE_IMG_URL,
} from './story.reducer'
import { store } from '../store/store.js'
import { storyService } from '../assets/services.js/story-service'

// Action Creators:
export function getActionRemovestory(storyId) {
  return {
    type: REMOVE_STORY,
    storyId,
  }
}

export function getActionAddstory(story) {
  return {
    type: ADD_STORY,
    story,
  }
}

export function getActionUpdatestory(story) {
  return {
    type: UPDATE_STORY,
    story,
  }
}

export async function loadStories() {
  try {
    const stories = await storyService.query()
    store.dispatch({
      type: SET_STORIES,
      stories,
    })
  } catch (err) {
    console.log('Cannot load srories', err)
    throw err
  }
}

export async function removeStory(storyId) {
  try {
    await storyService.remove(storyId)
    store.dispatch(getActionRemovestory(storyId))
  } catch (err) {
    console.log('Cannot remove story', err)
    throw err
  }
}

export async function addStory(story) {
  try {
    const savedstory = await storyService.create(story)
    console.log('Added story', savedstory)
    store.dispatch(getActionAddstory(savedstory))
    return savedstory
  } catch (err) {
    console.log('Cannot add story', err)
    throw err
  }
}

export async function updateStory(story) {
  try {
    let savedstory = await storyService.update(story)
    store.dispatch(getActionUpdatestory(savedstory))
    return savedstory
  } catch (err) {
    console.log('Cannot save story', err)
    throw err
  }
}

export function openCreateModal(story) {
  try {
    store.dispatch({
      type: OPEN_CREATE_MODAL,
      isOpen: true,
    })
  } catch (err) {
    console.log('Cannot open create modal', err)
    throw err
  }
}

export function closeCreateModal(story) {
  try {
    store.dispatch({
      type: CLOSE_CREATE_MODAL,
      isOpen: false,
    })
  } catch (err) {
    console.log('Cannot close create modal', err)
    throw err
  }
}

export function openRemoveModal() {
  try {
    store.dispatch({
      type: OPEN_REMOVE_MODAL,
      isOpen: true,
    })
  } catch (err) {
    console.log('Cannot open delete modal', err)
    throw err
  }
}

export function closeRemoveModal() {
  try {
    store.dispatch({
      type: CLOSE_REMOVE_MODAL,
      isOpen: false,
    })
  } catch (err) {
    console.log('Cannot close delete modal', err)
    throw err
  }
}

export function openStoryForwardModal() {
  try {
    store.dispatch({
      type: OPEN_STORY_FORWARD_MODAL,
      isOpen: true,
    })
  } catch (err) {
    console.log('Cannot open delete modal', err)
    throw err
  }
}

export function closeStoryForwardModal() {
  try {
    store.dispatch({
      type: CLOSE_STORY_FORWARD_MODAL,
      isOpen: false,
    })
  } catch (err) {
    console.log('Cannot close delete modal', err)
    throw err
  }
}

export function updateCurrentStory(story) {
  try {
    store.dispatch({
      type: UPDATE_CURRENT_STORY,
      story,
    })
  } catch (err) {
    console.log('Cannot update the current story', err)
    throw err
  }
}

export function updateImgUrl(story) {
  try {
    store.dispatch({
      type: UPDATE_IMG_URL,
      story,
    })
  } catch (err) {
    console.log('Cannot update the current story', err)
    throw err
  }
}

export async function addLikeOrComment(updatedStory) {
  await storyService.update(updatedStory)
  loadStories()
}
