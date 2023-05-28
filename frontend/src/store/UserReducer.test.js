import { userReducer } from './user.reducer'
import { gUsers } from '../assets/services.js/user-service.js'

describe('UserReducer', () => {
  const mockUser = { username: 'eli1', fullname: 'eli mor', id: 'u103' }
  const initialState = {
    user: gUsers[0],
    users: [],
    isSwitchModalOpen: false,
    isSearchOpen: false,
    isNotificationsOpen: false,
  }

  it('creates initial state', async () => {
    console.log('userReducer', userReducer)
    const state = userReducer(initialState)
    expect(state).toBe(initialState)
  })

  // it('should set an error message in the state', async () => {
  //   let state = UserReducer(initialState)
  //   expect(state.error).toBeFalsy()

  //     state = UserReducer(initialState, { type: 'SET_USERS', users: 'an error' })
  //     expect(state.error).toBeTruthy()
  //     // expect(state.error).toBe('an error')
  //     expect(state.user).toBeFalsy()
  //   })
})
