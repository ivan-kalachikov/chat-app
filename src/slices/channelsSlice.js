import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const DEFAULT_CHANNEL_ID = 1;

export const setInitialState = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (token, thunkAPI) => {
    const url = routes.data();
    try {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload.channel);
    },
    removeChannel: (state, action) => {
      const newChannels = state.channels.filter(({ id }) => id !== action.payload.id);
      state.channels = newChannels;
      state.currentChannelId = DEFAULT_CHANNEL_ID;
    },
    renameChannel: (state, action) => {
      const renamedChannel = action.payload.channel;
      const index = state.channels.findIndex(({ id }) => id === renamedChannel.id);
      state.channels[index] = renamedChannel;
    },
  },
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

const { reducer, actions } = channelsSlice;
const {
  setCurrentChannel, addChannel, removeChannel, renameChannel,
} = actions;
export {
  setCurrentChannel, addChannel, removeChannel, renameChannel, DEFAULT_CHANNEL_ID,
};
export default reducer;
