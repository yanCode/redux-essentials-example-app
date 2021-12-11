import {
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  AppDispatch,
  Notification,
  NotificationMessage,
  NotificationMetadata,
  RootState,
} from '../../types'
import apiSlice from '../api/apiSlice'
import { forceGenerateNotifications } from '../../api/server'

const notificationsReceived = createAction<Notification[]>(
  'notifications/notificationsReceived'
)

const notificationAdapter = createEntityAdapter<NotificationMetadata>()

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications',
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('ws://localhost')
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // update our query result with the received message
          const listener = (event: { data: string }) => {
            const message: NotificationMessage = JSON.parse(event.data)
            if (message.type === 'notifications') {
              updateCachedData((draft) => {
                // Insert all received notifications from the websocket
                // into the existing RTKQ cache array
                draft.push(...message.payload)
                draft.sort((a, b) => b.date.localeCompare(a.date))
              })
              // Dispatch an additional action so we can track "read" state
              dispatch(notificationsReceived(message.payload))
            }
          }

          ws.addEventListener('message', listener)
        } catch (e) {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
          console.log(e)
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
      },
    }),
  }),
})
const matchNotificationsReceived = isAnyOf(
  notificationsReceived,
  notificationApi.endpoints.getNotifications.matchFulfilled
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    allNotificationRead(state) {
      Object.values(state.entities).forEach((notification) => {
        notification!.read = true
      })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      matchNotificationsReceived,
      (state, action: PayloadAction<Notification[]>) => {
        const notificationsMetadata: NotificationMetadata[] =
          action.payload.map((notification) => ({
            id: notification.id,
            read: false,
            isNew: true,
          }))
        Object.values(state.entities).forEach((notification) => {
          // Any notifications we've read are no longer new
          notification!.isNew = !notification!.read
        })

        notificationAdapter.upsertMany(state, notificationsMetadata)
      }
    )
  },
})

export default notificationSlice.reducer
export const { allNotificationRead } = notificationSlice.actions

export const selectNotificationsResult =
  notificationApi.endpoints.getNotifications.select() as (state: RootState) => {
    data: Notification[] | undefined
  }

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => notificationsResult.data ?? ([] as Notification[])
)
export const { useGetNotificationsQuery } = notificationApi

export const fetchNotificationsWebsocket =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const allNotifications = selectNotificationsData(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification?.date ?? ''
    forceGenerateNotifications(latestTimestamp)
  }

export const {
  selectAll: selectNotificationsMetadata,
  selectEntities: selectMetadataEntities,
} = notificationAdapter.getSelectors((state: RootState) => state.notifications)
