import { newStory } from '../assets/services.js/story-service.js'
export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const OPEN_CREATE_MODAL = 'OPEN_CREATE_MODAL'
export const CLOSE_CREATE_MODAL = 'CLOSE_CREATE_MODAL'
export const OPEN_REMOVE_MODAL = 'OPEN_REMOVE_MODAL'
export const CLOSE_REMOVE_MODAL = 'CLOSE_REMOVE_MODAL'
export const OPEN_STORY_FORWARD_MODAL = 'OPEN_STORY_FORWARD_MODAL'
export const CLOSE_STORY_FORWARD_MODAL = 'CLOSE_STORY_FORWARD_MODAL'
export const UPDATE_CURRENT_STORY = 'UPDATE_CURRENT_STORY'
export const UPDATE_IMG_URL = 'UPDATE_IMG_URL'

const initialState = {
  stories: [],
  isCreateModalOpen: false,
  isRemoveModalOpen: false,
  isStoryForwardModalOpen: false,
  currentStory: newStory,
  updatedImgUrl: null,
}

export function storyReducer(state = initialState, action) {
  var newState = state
  var stories

  switch (action.type) {
    case SET_STORIES:
      newState = { ...state, stories: action.stories }
      break
    case REMOVE_STORY:
      const RemovedStory = state.stories.find(
        (story) => story.id === action.storyId
      )
      stories = state.stories.filter((story) => story.id !== action.storyId)
      newState = { ...state, stories, RemovedStory }
      break
    case ADD_STORY:
      newState = { ...state, stories: [...state.stories, action.story] }
      break
    case UPDATE_STORY:
      stories = state.stories.map((story) =>
        story.id === action.story.id ? action.story : story
      )
      newState = { ...state, stories }
      break
    case OPEN_CREATE_MODAL:
      newState = { ...state, isCreateModalOpen: action.isOpen }
      break
    case CLOSE_CREATE_MODAL:
      newState = {
        ...state,
        isCreateModalOpen: action.isOpen,
        updatedImgUrl: null,
      }
      break
    case OPEN_REMOVE_MODAL:
      newState = { ...state, isRemoveModalOpen: action.isOpen }
      break
    case CLOSE_REMOVE_MODAL:
      newState = {
        ...state,
        isRemoveModalOpen: action.isOpen,
        updatedImgUrl: null,
      }
      break
    case OPEN_STORY_FORWARD_MODAL:
      newState = { ...state, isStoryForwardModalOpen: action.isOpen }
      break
    case CLOSE_STORY_FORWARD_MODAL:
      newState = {
        ...state,
        isStoryForwardModalOpen: action.isOpen,
        updatedImgUrl: null,
      }
      break
    case UPDATE_CURRENT_STORY:
      newState = { ...state, currentStory: action.story }
      break
    case UPDATE_IMG_URL:
      newState = {
        ...state,
        updatedImgUrl: action.story,
      }
      break
    default:
  }
  return newState
}
