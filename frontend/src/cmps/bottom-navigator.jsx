import React, { useState } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Avatar from '@mui/material/Avatar'
import houseBlack from '../assets/icons/house-black.svg'
import search from '../assets/icons/search.svg'
import messages from '../assets/icons/messages.svg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function BottomTabNavigation() {
  const [value, setValue] = useState(0)
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  return (
    <div className='bottom-navigator'>
      <Box sx={{ width: '100%', borderTop: '1px solid lightgray' }}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            icon={
              <img
                src={houseBlack}
                alt='home'
              />
            }
            onClick={() => navigate('/instagram')}
          />
          <BottomNavigationAction
            icon={
              <img
                src={search}
                alt='search'
              />
            }
          />
          <BottomNavigationAction
            icon={
              <img
                src={messages}
                alt='messages'
              />
            }
            onClick={() => navigate('/instagram/messages')}
          />
          <BottomNavigationAction
            icon={
              <Avatar
                alt='Remy Sharp'
                sx={{ width: 24, height: 24, alignSelf: 'center' }}
                src={user?.imgUrl}
              />
            }
            onClick={() => navigate(`/instagram/${user?.username}`)}
          />
        </BottomNavigation>
      </Box>
    </div>
  )
}
