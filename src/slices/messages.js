/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setInitialState, actions as channelsActions } from './channels.js';

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
  },
  extraReducers: {
    [setInitialState.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
    },
    [channelsActions.removeChannel]: (state, action) => {
      const newMessages = state.messages
        .filter(({ channelId }) => channelId !== action.payload.id);
      state.messages = newMessages;
    },
  },
});

const { reducer, actions } = messagesSlice;
export { actions };
export default reducer;
