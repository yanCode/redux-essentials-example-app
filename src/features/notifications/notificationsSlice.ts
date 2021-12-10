import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
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

const notificationAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})
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
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    allNotificationRead(state) {
      Object.values(state.entities).forEach((no) => {
        no!.isNew = !no!.read
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      notificationAdapter.upsertMany
    )
  },
})

export default notificationSlice.reducer

export const { allNotificationRead } = notificationSlice.actions
export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors<RootState>((state) => state.notifications)
