/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeChannelMessages: (state, action) => {
      const newMessages = state.messages
        .filter(({ channelId }) => channelId !== action.payload.channelId);
      state.messages = newMessages;
    },
  },
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
    },
  },
});

const { reducer, actions } = messagesSlice;
export const { addMessage, removeChannelMessages } = actions;
export default reducer;
