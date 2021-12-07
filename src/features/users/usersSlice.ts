import {createSlice} from "@reduxjs/toolkit";

export interface User {
    id: string,
    name: string
}

const initialState = [
    {id: '0', name: 'Tianna Jenkins'},
    {id: '1', name: 'Kevin Grant'},
    {id: '2', name: 'Madison Price'}
] as User[]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer