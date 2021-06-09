import { addMessage } from './slices/messages.js';
import { addChannel, removeChannel, renameChannel } from './slices/channels.js';

const socketWatcher = (socket, dispatch) => {
  socket.on('newMessage', (response) => {
    dispatch(addMessage(response));
  });

  socket.on('newChannel', (response) => {
    dispatch(addChannel({ channel: response }));
  });

  socket.on('removeChannel', (response) => {
    dispatch(removeChannel(response));
  });

  socket.on('renameChannel', (response) => {
    dispatch(renameChannel({ channel: response }));
  });

  socket.on('connect_error', () => {
    console.log('CONNECT ERROR');
  });

  socket.on('disconnect', (reason) => {
    console.log('DISCONNECT', reason);
  });
};

export default socketWatcher;
