import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';
import messagesReducer from './messages.js';
import modalReducer from './modal.js';

export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
});
