import { FC } from 'react'
import { useAppSelector } from '../../types'
import { selectUserById } from '../users/usersSlice'

interface PostAuthorProps {
  userId: string
}

const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {
  const author = useAppSelector((state) => selectUserById(state, userId))
  return <span>by {author ? author.name : 'Unknown Author'}</span>
}

export default PostAuthor
