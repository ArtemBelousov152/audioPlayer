import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songLink: ''
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addSong(state, action) {
            state.songLink = action.payload
        },
        clearLink(state) {
            state.songLink = '';
        }
    }
})

export default playerSlice.reducer;