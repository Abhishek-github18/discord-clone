import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    server: null,
    selectedServer: null,
}

const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServer: (state, action) => {
            state.server = action.payload;
        },
        setSelectedServerDetails: (state, action)=>{
            state.selectedServer = action.payload
        }
    }
})

export const { setServer, setSelectedServerDetails } = serverSlice.actions;
export default serverSlice.reducer;