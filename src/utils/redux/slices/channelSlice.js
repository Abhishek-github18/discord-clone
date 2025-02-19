import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: null,
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export const { setChannels } = channelSlice.actions;
export default channelSlice.reducer;
