import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addNewPost } from './postSlice'
import { AppDispatch, OnChangeType, useAppSelector } from '../../types'
import { selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
  const dispatch: AppDispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const users = useAppSelector(selectAllUsers)
  const onTitleChanged = (e: OnChangeType) => setTitle(e.target.value)
  const onContentChanged = (e: OnChangeType) => setContent(e.target.value)
  const onAuthorChanged = (e: OnChangeType) => setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (!canSave) {
      return
    }
    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user: userId }))
      setTitle('')
      setContent('')
      setUserId('')
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          placeholder="what's in your mind?"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name=""
          id="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value="" />
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
