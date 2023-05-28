import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { addLikeOrComment, updateCurrentStory } from '../store/story.actions.js'
import { updateOtherUser, updateUser } from '../store/user.action.js'
import message from '../assets/icons/message black.svg'
import flag from '../assets/icons/flag black.svg'
import heartBlack from '../assets/icons/heart black.svg'
import heartRed from '../assets/icons/heart red.svg'
import plane from '../assets/icons/plane.svg'
import flagBlack from '../assets/icons/flagBlack.svg'
import { openStoryForwardModal } from '../store/story.actions.js'
import { utilService } from '../assets/services.js/util.service.js'

export function HeartSignContainer({ story }) {
  const user = useSelector((storeState) => storeState.userModule.user)
  const users = useSelector((storeState) => storeState.userModule.users)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(
    user?.savedStoryIds?.includes(story.id) ? true : false
  )

  async function onAddLike() {
    let updatedStory
    updatedStory = {
      ...story,
      likedBy: [
        ...story.likedBy,
        { id: user.id, fullname: user.fullname, imgUrl: user.imgUrl },
      ],
    }
    setIsLiked(true)
    await addLikeOrComment(updatedStory)
    updateCurrentStory(updatedStory)
    // add like notification
    //add notification to other user
    let newNotification = {
      id: utilService.makeId(),
      type: `${user.fullname} liked your story!`,
      by: {
        id: user.id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
      },
    }
    let otherUser = users.find((u) => u.id === story.by.id)
    let addNotificationToUser = {
      ...otherUser,
      notifications: [...otherUser.notifications, newNotification],
      isNewNotifications: true,
    }
    await updateOtherUser(addNotificationToUser)
  }

  function onRemoveLike() {
    let updatedStory
    let likesAfterRemove = story.likedBy.filter(
      (likedStory) => likedStory.id !== user.id
    )
    updatedStory = { ...story, likedBy: likesAfterRemove }
    setIsLiked(false)
    addLikeOrComment(updatedStory)
    updateCurrentStory(updatedStory)
  }

  function onOpenStoryForwardModal() {
    updateCurrentStory(story)
    openStoryForwardModal()
  }

  function OnFavoriteStories() {
    let addToUserFavorite
    if (isSaved) {
      console.log('isSaved', isSaved)
      let savedStoriesExceptThis = user?.savedStoryIds.filter(
        (savedStory) => savedStory.id !== story.id
      )
      addToUserFavorite = { ...user, savedStoryIds: savedStoriesExceptThis }
      setIsSaved(false)
    } else {
      const updatedStoriesIds = !user.savedStoryIds.includes(story.id)
        ? [...user.savedStoryIds, story.id]
        : [...user.savedStoryIds]
      addToUserFavorite = {
        ...user,
        savedStoryIds: updatedStoriesIds,
      }
      setIsSaved(true)
    }
    updateUser(addToUserFavorite)
    window.location.reload(false)
  }

  return (
    <div className='heart-sign-container'>
      <div className='iconsOnLeft'>
        {story?.likedBy.length &&
        story?.likedBy?.map((like) => like?.id === user?.id) ? (
          <button
            className='heart-icon'
            onClick={onRemoveLike}
          >
            <img
              src={heartRed}
              alt='heartRedIcon'
            />
          </button>
        ) : (
          <button
            className='heart-icon'
            onClick={onAddLike}
          >
            <img
              src={heartBlack}
              alt='heartBlackIcon'
            />
          </button>
        )}
        <button
          className='commentIcon'
          onClick={onOpenStoryForwardModal}
        >
          <img
            src={message}
            alt='messageIcon'
          />
        </button>
        <button className='planeIcon'>
          <img
            src={plane}
            alt='planeIcon'
          />
        </button>
      </div>
      <button
        className='flagIcon'
        onClick={OnFavoriteStories}
      >
        {isSaved ? (
          <img
            src={flagBlack}
            alt='flagIcon'
          />
        ) : (
          <img
            src={flag}
            alt='flagIcon'
          />
        )}
      </button>
    </div>
  )
}
