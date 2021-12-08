import { configureStore } from '@reduxjs/toolkit'
import userSlices from '../features/users/usersSlice'
import postSlice from '../features/posts/postSlice'
import notificationsSlice from '../features/notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlices,
    notifications: notificationsSlice,
  },
})
