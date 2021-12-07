import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ChangeEvent} from "react";
import userSlices from "../features/users/usersSlice";
import postSlice from "../features/posts/postSlice";

export const store = configureStore({
    reducer: {posts: postSlice, users: userSlices},
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispath>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface PostParam {
    postId: string
}

export type OnChangeType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>