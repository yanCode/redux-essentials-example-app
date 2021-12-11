import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../features/api/apiSlice'
import postSlice from '../features/posts/postSlice'
import userSlices from '../features/users/usersSlice'
import notificationsSlice from '../features/notifications/notificationsSlice'

export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlices,
    notifications: notificationsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
})
