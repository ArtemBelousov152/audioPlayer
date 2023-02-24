import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songLink: '',
    history: [],
    activePlayer: 1
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
        },
        addLinkOnHistory(state, action) {
            state.history.push(action.payload);
        },
        setActivePlayer(state, action) {
            state.activePlayer = action.payload;
        }
    }
})

export default playerSlice.reducer;