import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions, setInitialState } from './channels.js';
import messagesReducer, { actions as messagesActions } from './messages.js';
import modalReducer, { actions as modalActions } from './modal.js';

export default combineReducers({
  channelsInfo: channelsReducer,
  messagesInfo: messagesReducer,
  modal: modalReducer,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

const asyncActions = { setInitialState };

export { actions, asyncActions };
