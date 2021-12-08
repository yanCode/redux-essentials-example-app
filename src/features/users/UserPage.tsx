import { FC } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { useAppSelector } from '../../types'
import { selectAllPosts } from '../posts/postSlice'

type UserPageProps = {
  userId: string
}
const UserPage: FC<RouteComponentProps<UserPageProps>> = ({
  match: {
    params: { userId },
  },
}) => {
  const user = useAppSelector((state) => selectUserById(state, userId))

  const postsForUser = useAppSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

  if (!user) {
    return <div>invalid param</div>
  }

  const postTitles = postsForUser.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/posts/${id}`}>{title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
