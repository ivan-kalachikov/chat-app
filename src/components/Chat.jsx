import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import AuthTokenContext from '../context/AuthTokenContext.jsx';
import SocketInstanceContext from '../context/SocketInstanceContext.jsx';
import { setInitialState } from '../slices/channels';
import socketWatcher from '../socketWatcher';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';

const Chat = () => {
  const { authToken } = useContext(AuthTokenContext);
  const socket = useContext(SocketInstanceContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialState(authToken));
    socketWatcher(socket, dispatch);
  });

  return (
    <Container className="my-4 overflow-hidden flex-grow-1 rounded shadow">
      <Row className="h-100 overflow-auto bg-white">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default Chat;
