import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const initialState = {
  channels: [],
  currentChannelId: null,
  loading: 'idle',
  messages: [],
};

export const fetchChatData = createAsyncThunk(
  'chatData/fetchChatData',
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

const chatDataSlice = createSlice({
  name: 'chatData',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: {
    [fetchChatData.pending]: (state) => {
      state.loading = 'pending';
    },
    [fetchChatData.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
      state.messages = action.payload.messages;
      state.loading = 'successful';
    },
    [fetchChatData.rejected]: (state) => {
      state.loading = 'idle';
    },
  },
});

const { reducer, actions } = chatDataSlice;
export const { setActiveChannel } = actions;
export default reducer;
