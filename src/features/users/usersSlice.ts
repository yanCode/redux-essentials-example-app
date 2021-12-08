import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export interface User {
  id: string
  name: string
}

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

export default usersSlice.reducer
