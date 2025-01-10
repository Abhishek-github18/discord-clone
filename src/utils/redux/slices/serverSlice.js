import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    server: null,
}

const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServer: (state, action) => {
            state.server = action.payload;
        },
    }
})

export const { setServer } = serverSlice.actions;
export default serverSlice.reducer;