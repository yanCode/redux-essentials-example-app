import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ChangeEvent } from 'react'
import { store } from './app/store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface PostParam {
  postId: string
}

export type OnChangeType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export type RequestType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

export type ReactionTypes = keyof Reactions

export type Reactions = {
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
}

export interface Notification {
  id: string
  message: string
  date: string
  user: string
  read: boolean
  isNew?: boolean
}

export interface NotificationMessage {
  type: 'notifications' | string
  payload: Notification[]
}

export interface NotificationMetadata {
  id: string
  read: boolean
  isNew: boolean
}
