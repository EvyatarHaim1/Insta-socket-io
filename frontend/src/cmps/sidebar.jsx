import React from 'react'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { CreatePostModal } from '../cmps/create-post-modal.jsx'
import { openCreateModal } from '../store/story.actions'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import InstagramIcon from '@mui/icons-material/Instagram'
import houseBlack from '../assets/icons/house-black.svg'
import search from '../assets/icons/search.svg'
import messages from '../assets/icons/messages.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Badge from '@mui/material/Badge'
import {
  toggleNotificationsDrawer,
  toggleSearchDrawer,
  updateUser,
} from '../store/user.action.js'

export function Sidebar() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const isSearchOpen = useSelector(
    (storeState) => storeState.userModule.isSearchOpen
  )
  const isNotificationsOpen = useSelector(
    (storeState) => storeState.userModule.isNotificationsOpen
  )

  function openNotificationDrawer() {
    toggleNotificationsDrawer(!isNotificationsOpen)
    let setNotificationOfUser = { ...user, isNewNotifications: false }
    updateUser(setNotificationOfUser)
  }

  return (
    <Fragment>
      <section className='side-bar'>
        <CreatePostModal />
        <a
          className='ig-title'
          href='/instagram'
        >
          <img
            alt=''
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png'
            style={{ width: '100px', marginLeft: '12px' }}
          />
        </a>
        <div className='ig-icon'>
          <InstagramIcon />
        </div>

        <nav>
          <NavLink
            className='nav-btn'
            to='/instagram'
          >
            <span className='nav-icon'>
              <img
                src={houseBlack}
                alt='home'
              />
            </span>
            <span className='route-label'>Home</span>
          </NavLink>
          <NavLink
            onClick={() => toggleSearchDrawer(!isSearchOpen)}
            className='nav-btn'
            to='/instagram/search'
          >
            <span className='nav-icon'>
              <img
                src={search}
                alt='search'
              />
            </span>
            <span className='route-label'>Search</span>
          </NavLink>

          <NavLink
            className='nav-btn'
            to='/instagram/messages'
          >
            <span className='nav-icon'>
              <img
                src={messages}
                alt='messages'
              />
            </span>
            <span className='route-label'>Messages</span>
          </NavLink>

          <NavLink
            className='nav-btn'
            to='/instagram/notifications'
            onClick={openNotificationDrawer}
          >
            <span className='nav-icon'>
              {user?.isNewNotifications ? (
                <Badge
                  badgeContent={''}
                  variant='dot'
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'red',
                      width: '4px',
                    },
                  }}
                  color='secondary'
                >
                  <FavoriteBorderIcon />
                </Badge>
              ) : (
                <FavoriteBorderIcon />
              )}
            </span>
            <span className='route-label'>Notifications</span>
          </NavLink>
          <NavLink
            onClick={openCreateModal}
            className='nav-btn'
            to='instagram/create'
          >
            <span className='nav-icon'>
              <i className='fa-regular fa-square-plus' />
            </span>
            <span className='route-label'>Create</span>
          </NavLink>
          <NavLink
            className='nav-btn'
            to={`/instagram/${user?.username}`}
          >
            <span className='nav-icon'>
              <Avatar
                alt='Remy Sharp'
                sx={{ width: 24, height: 24, alignSelf: 'center' }}
                src={user?.imgUrl}
              />
            </span>
            <span className='route-label'>Profile</span>
          </NavLink>
        </nav>
        <div className='side-bar-more'>
          <i className='fa-solid fa-bars'></i>
          <span>More</span>
        </div>
      </section>
    </Fragment>
  )
}
