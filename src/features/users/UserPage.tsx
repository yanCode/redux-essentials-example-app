import { FC, useMemo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { Post, useAppSelector } from '../../types'
import { createSelector } from '@reduxjs/toolkit'
import { useGetPostsQuery } from '../api/apiSlice'

type UserPageProps = {
  userId: string
}
const UserPage: FC<RouteComponentProps<UserPageProps>> = ({
  match: {
    params: { userId },
  },
}) => {
  const user = useAppSelector((state) => selectUserById(state, userId))

  const selectPostsForUser = useMemo(() => {
    return createSelector(
      [(res: { data: Post[] }) => res.data, (_, userId: string) => userId],
      (posts, userId) => posts?.filter((post) => post.user === userId) ?? []
    )
  }, [])
  // const postsForUser = useAppSelector((state) => {
  //   const allPosts = selectAllPosts(state)
  //   return allPosts.filter((post) => post.user === userId)
  // })
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result as { data: Post[] }, userId),
    }),
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
