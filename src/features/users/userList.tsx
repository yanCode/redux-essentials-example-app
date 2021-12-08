import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'
import { FC } from 'react'

const UserList: FC = () => {
  const user = useSelector(selectAllUsers)
  const renderedUsers = user.map(({ id, name }) => (
    <li key={id}>
      <Link to={`/users/${id}`}>{name}</Link>
    </li>
  ))
  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UserList
