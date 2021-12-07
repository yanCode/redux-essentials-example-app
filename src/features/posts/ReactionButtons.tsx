import {FC} from "react";
import {reactionAdded, Reactions} from "./postSlice";
import {useAppDispatch} from "../../app/store";

type ReactionTypes = keyof Reactions
const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
} as {
    [key in ReactionTypes]: string
}

interface ReactionButtons {
    reactions: Reactions,
    id: string
}

const ReactionButtons: FC<Pick<ReactionButtons, "id" | "reactions">> = ({reactions, id}) => {
    const dispatch = useAppDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        let reactionName = name as ReactionTypes;
        return (
            <button key={name} type='button'
                    className="muted-button reaction-button"
                    onClick={() => {
                        dispatch(reactionAdded({postId: id, reaction: reactionName}))
                    }}
            >
                {emoji} {reactions[reactionName]}
            </button>
        )
    })
    return <div>{reactionButtons}</div>
}

export default ReactionButtons