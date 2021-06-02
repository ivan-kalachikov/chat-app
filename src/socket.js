import { io } from 'socket.io-client';
import { addMessage, removeChannelMessages } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

const socket = io({
  autoConnect: false,
});

const socketWatcher = (dispatch) => {
  socket.connect();
  socket.on('newMessage', (response) => {
    dispatch(addMessage(response));
  });

  socket.on('newChannel', (response) => {
    dispatch(addChannel({ channel: response }));
  });

  socket.on('removeChannel', (response) => {
    dispatch(removeChannel(response));
    dispatch(removeChannelMessages({ channelId: response.id }));
  });

  socket.on('renameChannel', (response) => {
    dispatch(renameChannel({ channel: response }));
  });

  socket.on('connect_error', () => {
    console.log('ERROR CONNECTION');
  });

  socket.on('disconnect', (reason) => {
    console.log('DISCONNECT', reason);
  });
};

export default socket;

export { socketWatcher };
