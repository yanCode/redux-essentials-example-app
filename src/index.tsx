import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'

import { userApiSlice } from './features/users/usersSlice'

// Start our mock API servery
worker.start({ onUnhandledRequest: 'bypass' })

store.dispatch(userApiSlice.endpoints.getUsers.initiate())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
