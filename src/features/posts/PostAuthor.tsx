import { FC } from 'react'
import { useAppSelector } from '../../types'

interface PostAuthorProps {
  userId: string
}

const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  return <span>by {author ? author.name : 'Unknown Author'}</span>
}

export default PostAuthor
