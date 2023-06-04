import React, { useState, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import chatroomPic from '../assets/icons/chatroomPic.svg'
import heartBlack from '../assets/icons/heart black.svg'
import { loadUsers, updateUser } from '../store/user.action.js'
import { useSelector } from 'react-redux'

export function ChatRoomFooter({ socket, room, setMessageList }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  const users = useSelector((storeState) => storeState.userModule.users)
  const [text, setText] = useState('')
  const [, setChosenEmoji] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  function openEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker)
  }

  function onEmojiClick(event, emojiObject) {
    setChosenEmoji(emojiObject)
    setShowEmojiPicker(false)
    setText((prev) => prev + event.emoji)
  }

  const sendMessage = async () => {
    if (text !== '') {
      const messageData = {
        room: room,
        userId: user.id,
        fullname: user.fullname,
        avatar: user.imgUrl,
        message: text,
        timestamp:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      }
      socket.emit('send_message', messageData)
      const userMessages = [...user.messages]
      const roomIndex = userMessages.findIndex(
        (chatRoom) => chatRoom?.room === room
      )
      let currentRoom = userMessages[roomIndex]
      let updatedCurrentRoom = {
        ...currentRoom,
        list: [
          ...currentRoom.list,
          {
            timestamp: messageData?.timestamp,
            fullname: messageData?.fullname,
            avatar: messageData?.avatar,
            message: messageData?.message,
          },
        ],
      }
      userMessages[roomIndex] = updatedCurrentRoom
      setMessageList((list) => [
        ...list,
        {
          timestamp: messageData?.timestamp,
          fullname: messageData?.fullname,
          avatar: messageData?.avatar,
          message: messageData?.message,
        },
      ])
      setText('')
      const otherUserInRoom = users.find(
        (u) => u.id === currentRoom.otherUserId
      )
      await updateUser({
        ...user,
        messages: userMessages,
      })
      await updateUser({
        ...otherUserInRoom,
        messages: userMessages,
      })
    }
  }
  return (
    <div className='footer-input'>
      <div className='footer-input-area'>
        <div className='footer-input-area-section'>
          <button>
            <div
              className='footer-emoji'
              onClick={openEmojiPicker}
            ></div>
          </button>
          <input
            className='input-field'
            placeholder='Message...'
            type={'text'}
            size={'55'}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
            }}
            onKeyPress={(event) => {
              event.key === 'Enter' && sendMessage()
            }}
          />
          <button onClick={sendMessage}></button>
        </div>
        <div className='footer-input-area-section'>
          <img
            src={chatroomPic}
            alt='chatroomPic'
          />
          <button className='heart-icon'>
            <img
              src={heartBlack}
              alt='heartBlackIcon'
            />
          </button>
        </div>
      </div>
      {showEmojiPicker ? (
        <div
          style={{ position: 'absolute', bottom: '40px', marginLeft: '80px' }}
        >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            native
          />
        </div>
      ) : null}
    </div>
  )
}
