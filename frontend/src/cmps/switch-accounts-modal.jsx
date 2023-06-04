import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import vi from '../assets/icons/vi.svg'
import Avatar from '@mui/material/Avatar'
import { gUsers } from '../assets/services.js/user-service.js'
import { switchUser, closeSwitchUsersModal } from '../store/user.action.js'
import close from '../assets/icons/close.svg'
import { useMediaQuery } from '@mui/material'

export function SwitchAcoountsModal() {
  const matches = useMediaQuery('(max-width:480px)')
  const isSwitchModalOpen = useSelector(
    (storeState) => storeState.userModule.isSwitchModalOpen
  )
  const user = useSelector((storeState) => storeState.userModule.user)

  function onLogin(userLine) {
    switchUser(userLine)
    closeSwitchUsersModal()
  }

  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? '80%' : 370,
    // height: 370,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '2%',
    overflowY: 'visible',
  }

  return (
    <Modal
      open={isSwitchModalOpen}
      onClose={closeSwitchUsersModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <div className='switch-accounts-modal'>
          <div className='modal-header'>
            <span className='modal-title'>Switch accounts </span>
            <img
              src={close}
              alt='close'
              onClick={closeSwitchUsersModal}
            />
          </div>

          {gUsers.map((userLine) => (
            <div
              className='registered-user'
              key={userLine.id}
              onClick={() => onLogin(userLine)}
            >
              <div className='left-section'>
                <Avatar
                  alt={userLine.fullname}
                  sx={{ width: 24, height: 24, alignSelf: 'center' }}
                  src={userLine.imgUrl}
                />
                <span className='username'>{userLine.fullname}</span>
              </div>
              {user && user.username === userLine.username ? (
                <img
                  src={vi}
                  width='30'
                  height='30'
                  alt='newPostImg'
                ></img>
              ) : null}
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  )
}
