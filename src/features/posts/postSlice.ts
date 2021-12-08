import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { RequestType, RootState } from '../../types'

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

export type ReactionTypes = keyof Reactions

export type Reactions = {
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
}

export const getInitReactions = (): Reactions => {
  return {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  }
}

const initialState = {
  posts: [] as Post[],
  status: 'idle' as RequestType,
  error: undefined as string | undefined,
}

export const addNewPost = createAsyncThunk<
  Post,
  Pick<Post, 'title' | 'content' | 'user'>
>('post/addNewPost', async (initPost) => {
  const response = await client.post('/fakeApi/posts', initPost)
  return response.data
})
export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  }
)

const postsSlice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare({
        title,
        content,
        user: userId,
      }: Pick<Post, 'title' | 'content' | 'user'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            reactions: getInitReactions(),
            date: new Date().toISOString(),
          } as Post,
        }
      },
    },

    postUpdated: (
      state,
      {
        payload: { id, title, content },
      }: PayloadAction<Pick<Post, 'id' | 'title' | 'content'>>
    ) => {
      const post = state.posts.find((post) => post.id === id)
      if (!post) {
        return
      }
      post.title = title
      post.content = content
    },
    reactionAdded(
      state,
      {
        payload: { postId, reaction },
      }: PayloadAction<{ postId: string; reaction: keyof Reactions }>
    ) {
      const existingPost = state.posts.find((post) => post.id === postId)
      if (!existingPost) {
        return
      }
      existingPost.reactions[reaction]++
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload)
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.status = 'succeeded'
        state.posts.push(...posts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default postsSlice.reducer

export const { postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state: RootState) => state.posts.posts
export const getPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)
