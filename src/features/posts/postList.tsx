import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { fetchPosts, Post, selectAllPosts } from './postSlice'
import { useAppDispatch, useAppSelector } from '../../types'
import { Spinner } from '../../components/Spinner'

type PostExcerptProps = { post: Post }

let PostExcerpt: FC<PostExcerptProps> = ({
  post: { content, title, id, reactions, user, date },
}) => {
  return (
    <article className="post-excerpt" key={id}>
      <h3>{title}</h3>
      <div>
        <PostAuthor userId={user} />
        <TimeAgo timestamp={date} />
      </div>
      <p className="post-content">{content.substring(0, 100)}</p>
      <ReactionButtons id={id} reactions={reactions} />
      <Link to={`posts/${id}`}>View Details</Link>
    </article>
  )
}
PostExcerpt = memo(PostExcerpt)

const PostList: FC = () => {
  const dispatch = useAppDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useAppSelector((state) => state.posts.status)
  const error = useAppSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'idle') {
    content = <Spinner text="loading" />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostList
