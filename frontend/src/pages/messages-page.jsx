import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { UserMessage } from '../cmps/user-message'
import pen from '../assets/icons/pen.svg'
import roomIcon from '../assets/icons/roomIcon.svg'
import phone from '../assets/icons/phone.svg'
import video from '../assets/icons/video.svg'
import info from '../assets/icons/info.svg'
import { Avatar } from '@mui/material'
import { ChatRoomFooter } from '../cmps/chat-room-footer'
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'
import { Chat } from '../cmps/chat'

function Messages() {
  const socket = io.connect('')
  const user = useSelector((storeState) => storeState.userModule.user)
  const [userToMsg, setUserToMsg] = useState(null)
  const [messageList, setMessageList] = useState([])
  const [room, setRoom] = useState('')

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data])
      console.log(messageList)
    })
  }, [messageList, socket])

  const joinRoom = (room) => {
    if (user && room) {
      socket.emit('join_room', room)
      socket.on('join_room', (data) => {
        console.log(data)
      })
    }
  }

  const showLastRoomMessage = () => {
    return user?.messages?.map((m) => {
      const otherMsgs = m.list.filter((chat) => chat.fullname !== user.fullname)
      return (
        <UserMessage
          key={uuidv4()}
          u={otherMsgs[otherMsgs.length - 1]}
          room={m?.room}
          setUserToMsg={setUserToMsg}
          setRoom={setRoom}
          setMessageList={setMessageList}
          joinRoom={joinRoom}
        />
      )
    })
  }

  const onMessagesSearchModal = () => {}
  return (
    <div className='messages-container'>
      <div className='messages-content'>
        <div className='messages-list'>
          <div className='messages-header'>
            <div className='messages-header-left'>
              <span>{user?.username}</span>
              <span onClick={onMessagesSearchModal}>
                <KeyboardArrowDownIcon fontSize='large' />
              </span>
            </div>
            <div className='messages-header-right'>
              <img
                src={pen}
                alt='penIcon'
              />
            </div>
          </div>
          <div className='messages-title'>
            <span>Messages</span>
            <span>2 requests</span>
          </div>
          <div className='messages'>{showLastRoomMessage()}</div>
        </div>

        <div className='messages-room'>
          {userToMsg ? (
            <div className='chat-open'>
              <div className='chat-open-header'>
                <div className='chat-open-header-content'>
                  <div className='chat-open-header-l'>
                    <Avatar
                      sx={{
                        width: '24px',
                        height: '24px',
                      }}
                      src={userToMsg?.avatar}
                      alt='user'
                    />

                    {userToMsg.fullname}
                  </div>
                  <div className='chat-open-header-r'>
                    <img
                      src={phone}
                      alt='phoneIcon'
                    />
                    <img
                      src={video}
                      alt='videoIcon'
                    />
                    <img
                      src={info}
                      alt='infoIcon'
                    />
                  </div>
                </div>
              </div>
              <div className='chat-body'>
                <Chat
                  messageList={messageList}
                  room={room}
                />
              </div>
              <div className='chat-footer'>
                <ChatRoomFooter
                  socket={socket}
                  room={room}
                  messageList={messageList}
                  setMessageList={setMessageList}
                />
              </div>
            </div>
          ) : (
            <div className='chat-closed'>
              <img
                src={roomIcon}
                alt='messagesIcon'
              />

              <span>Your Messages</span>
              <span>
                Send private photos and messages to a friend or group.
              </span>
              <button>Send message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
