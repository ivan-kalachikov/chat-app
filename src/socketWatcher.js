import { actions } from './slices/index.js';

const socketWatcher = (socket, dispatch) => {
  socket.on('newMessage', (response) => {
    dispatch(actions.addMessage(response));
  });

  socket.on('newChannel', (response) => {
    dispatch(actions.addChannel({ channel: response }));
  });

  socket.on('removeChannel', (response) => {
    dispatch(actions.removeChannel(response));
  });

  socket.on('renameChannel', (response) => {
    dispatch(actions.renameChannel({ channel: response }));
  });

  socket.on('connect_error', () => {
    console.log('CONNECT ERROR');
  });

  socket.on('disconnect', (reason) => {
    console.log('DISCONNECT', reason);
  });
};

export default socketWatcher;
