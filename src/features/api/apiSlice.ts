import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, ReactionTypes } from '../../types'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result = []) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post' as const, id })),
      ],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, _, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation<
      void,
      Pick<Post, 'title' | 'content' | 'user'>
    >({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),

    editPost: builder.mutation<Post, Pick<Post, 'title' | 'content' | 'id'>>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (_, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    addReaction: builder.mutation<
      Post,
      { postId: string; reaction: ReactionTypes }
    >({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: 'POST',
        body: { reaction },
      }),
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'Post', id: arg.postId },
      // ],
      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        let patchResult
        try {
          const result = await queryFulfilled
          patchResult = dispatch(
            apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
              let post = draft.find((post) => post.id === postId)
              if (post) {
                post.reactions = result.data.reactions
              }
            })
          )
        } catch {
          patchResult?.undo()
        }
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice

export default apiSlice
