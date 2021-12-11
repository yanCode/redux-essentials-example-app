import { useAppDispatch, useAppSelector } from '../../types'
import {
  allNotificationRead,
  selectMetadataEntities,
  useGetNotificationsQuery,
} from './notificationsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { FC, useLayoutEffect } from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classNames from 'classnames'

const NotificationsList: FC = () => {
  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationMetadata = useAppSelector(selectMetadataEntities)
  const users = useAppSelector(selectAllUsers)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(allNotificationRead())
  })

  const renderedNotifications = notifications.map(
    ({ date, user: userId, id, message, isNew }) => {
      const isoDate = parseISO(date)
      const timeAgo = formatDistanceToNow(isoDate)
      const user = users.find(({ id }) => id === userId) || {
        name: 'Unknown User',
      }
      const metadata = notificationMetadata[id]
      const notificationClass = classNames('notification', {
        new: metadata?.isNew ?? false,
      })
      return (
        <div key={id} className={notificationClass}>
          <div>
            <b>{user.name}</b> {message}
          </div>
          <div title={date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      )
    }
  )

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList
