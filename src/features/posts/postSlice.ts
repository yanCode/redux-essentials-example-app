import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit'
import {subHours, subMinutes} from "date-fns";
import {RootState} from "../../app/store";

export interface Post {
    id: string
    title: string
    content: string
    user: string
    date: string
    reactions: Reactions
}

export type Reactions =  {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
};

export const getInitReactions = ():Reactions=>{
    return{
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
    }
}

const initialState = [
    {id: '1', title: 'First Post!', content: 'Hello!',
        date: subMinutes(new Date(), 3).toISOString(), user: "2",
        reactions: getInitReactions()
    },
    {id: '2', title: 'Second Post', content: 'More text',
        date: subHours(new Date(), 3).toISOString(), user: "1",
        reactions: getInitReactions()
    },
] as Post[]

const postsSlice = createSlice({
    initialState,
    name: 'posts',
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                state.push(action.payload)
            },
            prepare({title, content, user: userId}: Pick<Post, "title"|"content"|"user">) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId,
                        reactions: getInitReactions(),
                        date: new Date().toISOString()
                    } as Post
                }
            },
        },

        postUpdated: (
            state,
            {payload: {id, title, content}}: PayloadAction<Partial<Post>>
        ) => {
            const post = state.find((post) => post.id === id)
            if (!post) {
                return
            }
            title && (post.title = title)
            content && (post.content = content)
        },
        reactionAdded(state, {payload:{postId, reaction}}:PayloadAction<{postId:string, reaction:keyof Reactions}>){
            const existingPost = state.find(post => post.id === postId)
            if (!existingPost) {
                return;
            }
            existingPost.reactions[reaction] ++
            
        }
    },
})

export default postsSlice.reducer

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts
export const getPostById = (state:RootState, postId:string)=>state.posts.find(post=>post.id ===postId)