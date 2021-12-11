import { FC, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { OnChangeType, PostParam } from '../../types'
import { useEditPostMutation, useGetPostQuery } from '../api/apiSlice'

const EditPostForm: FC<RouteComponentProps<PostParam>> = ({
  match: {
    params: { postId },
  },
}) => {
  const { data: post } = useGetPostQuery(postId)
  const [updatePost, { isLoading }] = useEditPostMutation()

  const history = useHistory()

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)
  if (!post) {
    return <div>invalid param</div>
  }

  const onTitleChanged = (e: OnChangeType) => setTitle(e.target.value)
  const onContentChanged = (e: OnChangeType) => setContent(e.target.value)

  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content })

      history.push(`/posts/${postId}`)
    }
  }
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        {isLoading ? 'Loading' : 'Save Post'}
      </button>
    </section>
  )
}

export default EditPostForm
