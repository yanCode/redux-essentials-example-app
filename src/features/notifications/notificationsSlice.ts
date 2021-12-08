import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../types'
import { client } from '../../api/client'

interface Notification {
  id: string
  message: string
  date: string
  user: string
  read: boolean
  isNew?: boolean
}

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { state: RootState }
>('notifications/fetchNotifications', async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get(
    `/fakeApi/notifications?since=${latestTimestamp}`
  )
  return response.data
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    allNotificationRead(state) {
      state.forEach((notification) => (notification.read = true))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.forEach((notification) => {
        notification.isNew = !notification.read
      })
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export default notificationSlice.reducer
export const selectAllNotifications = (state: RootState) => state.notifications
export const { allNotificationRead } = notificationSlice.actions
