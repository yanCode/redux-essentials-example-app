import { FC } from 'react'
import { Reactions } from '../../types'
import { useAddReactionMutation } from '../api/apiSlice'

type ReactionTypes = keyof Reactions
const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}
const reactionEmojiList = Object.entries(reactionEmoji).map(
  ([name, emoji]) => ({ name, emoji })
) as { name: ReactionTypes; emoji: string }[]

interface ReactionButtonProps {
  reactions: Reactions
  id: string
}

const ReactionButtons: FC<Pick<ReactionButtonProps, 'id' | 'reactions'>> = ({
  reactions,
  id,
}) => {
  const [addReaction] = useAddReactionMutation()
  const reactionButtons = reactionEmojiList.map(({ name, emoji }) => {
    let reactionName = name as ReactionTypes
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => {
          addReaction({ postId: id, reaction: reactionName })
        }}
      >
        {emoji} {reactions[reactionName]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}

export default ReactionButtons
