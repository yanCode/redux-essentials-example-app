import {FC, useState} from 'react'
import {useDispatch} from 'react-redux'
import {RouteComponentProps, useHistory} from 'react-router-dom'
import {AppDispath, OnChangeType, PostParam, useAppSelector} from 'src/app/store'
import {getPostById, postUpdated} from './postSlice'

const EditPostForm: FC<RouteComponentProps<PostParam>> =
    ({
         match: {
             params: {postId},
         },
     }) => {
    const post = useAppSelector(state=>getPostById(state, postId))

    const dispatch:AppDispath = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.content)
    if (!post) {
        return <div>invalid param</div>
    }

    const onTitleChanged = (e: OnChangeType) => setTitle(e.target.value)
    const onContentChanged = (e: OnChangeType) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }))

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
                Save Post
            </button>
        </section>
    )
}

export default EditPostForm
