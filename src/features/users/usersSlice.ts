import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

import { RootState } from '../../types'
import apiSlice from '../api/apiSlice'

export interface User {
  id: string
  name: string
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      transformResponse: (respondedUsers: User[]) => {
        //todo a simple demo to showcase transferring /converting the http responded data.
        respondedUsers.forEach((user) => (user.name = user.name.toUpperCase()))
        return respondedUsers
      },
    }),
  }),
})

export const { useGetUsersQuery } = userApiSlice
export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
  }
)

const initialState = [] as User[]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload: users }) => {
      state.push(...users)
    })
  },
})
// export const selectAllUsers = (state: RootState) => state.users
// export const selectUserById = (state: RootState, userId: string) =>
//   state.users.find((user) => user.id === userId)

export default usersSlice.reducer

export const selectUserResult = userApiSlice.endpoints.getUsers.select() as (
  state: RootState
) => { data: User[] } | undefined

export const selectAllUsers = createSelector(selectUserResult, (userResult) => {
  return userResult?.data ?? ([] as User[])
})

export const selectUserById = createSelector(
  selectAllUsers,
  (state: RootState, userId: string) => userId,
  (users, userId) => {
    return users.find((user) => user.id === userId)
  }
)
