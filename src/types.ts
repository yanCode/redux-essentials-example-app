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
