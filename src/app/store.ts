import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ChangeEvent} from "react";
import userSlices from "../features/users/usersSlice";
import postSlice from "../features/posts/postSlice";

export const store = configureStore({
    reducer: {posts: postSlice, users: userSlices},
})

