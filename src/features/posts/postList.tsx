import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Spinner } from '../../components/Spinner'
import { useGetPostsQuery } from '../api/apiSlice'
import classnames from 'classnames'
import { Post } from '../../types'

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
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
  } = useGetPostsQuery()

  const sortedPosts = posts.slice()
  sortedPosts.sort((a, b) => b.date.localeCompare(a.date))

  let content
  if (isLoading) {
    content = <Spinner text="loading" />
  } else if (isSuccess) {
    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    })

    const renderedContent = posts!.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
    content = <div className={containerClassname}>{renderedContent}</div>
  } else if (isError) {
    content = <div>{error!.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostList
