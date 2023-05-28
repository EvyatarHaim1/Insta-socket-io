import { gUsers } from '../assets/services.js/user-service.js'
import { loadLoggedUser } from './user.action.js'
export const SWITCH_USER = 'SWITCH_USER'
export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const CLOSE_SWITCH_USERS_MODAL = 'CLOSE_SWITCH_USERS_MODAL'
export const OPEN_SWITCH_USERS_MODAL = 'OPEN_SWITCH_USERS_MODAL'
export const SAVE_STORY_TO_USER = 'SAVE_STORY_TO_USER'
export const TOGGLE_NOTIFICATIONS_DRAWER = 'TOGGLE_NOTIFICATIONS_DRAWER'
export const TOGGLE_SEARCH_DRAWER = 'TOGGLE_SEARCH_DRAWER'

const initialState = {
  user: gUsers[0],
  users: [],
  isSwitchModalOpen: false,
  isSearchOpen: false,
  isNotificationsOpen: false,
}

export function userReducer(state = initialState, action) {
  var newState = state

  switch (action.type) {
    case SET_USERS:
      newState = { ...state, users: action.users }

      break
    case SET_USER:
      newState = { ...state, user: action.user }
      break

    case SWITCH_USER:
      newState = { ...state, user: action.userLine }
      break
    case OPEN_SWITCH_USERS_MODAL:
      newState = { ...state, isSwitchModalOpen: action.isSwitchModalOpen }
      break
    case CLOSE_SWITCH_USERS_MODAL:
      newState = { ...state, isSwitchModalOpen: action.isSwitchModalOpen }
      break
    case SAVE_STORY_TO_USER:
      newState = { ...state, user: action.user }
      break
    case TOGGLE_SEARCH_DRAWER:
      newState = { ...state, isSearchOpen: action.isSearchOpen }
      break
    case TOGGLE_NOTIFICATIONS_DRAWER:
      newState = { ...state, isNotificationsOpen: action.isNotificationsOpen }
      break
    default:
      return newState
  }
  return newState
}
