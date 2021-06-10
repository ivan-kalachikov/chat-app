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

  socket.on('disconnect', (reason) => {
    dispatch(actions.openModal({ type: 'connectionProblem', extra: reason }));
  });
};

export default socketWatcher;
