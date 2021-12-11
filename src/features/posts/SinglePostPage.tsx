import { FC } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { PostParam } from '../../types'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

const SinglePostPage: FC<RouteComponentProps<PostParam>> = ({
  match: {
    params: { postId },
  },
}) => {
  // const post = useAppSelector((state) => getPostById(state, postId))
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)

  let content
  if (isFetching) {
    content = <Spinner text="Loading" />
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post!.title}</h2>
        <p className="post-content">{post!.content}</p>
        <Link to={`/editPost/${post!.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  } else if (isError) {
    content = <span>{error!}</span>
  }
  return <section>{content}</section>
}
export default SinglePostPage
