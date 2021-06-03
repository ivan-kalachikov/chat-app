import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import AuthTokenContext from '../context/AuthTokenContext.jsx';
import { setInitialState } from '../slices/channelsSlice';
import { socketWatcher } from '../socket';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
  const { authToken } = useContext(AuthTokenContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialState(authToken));
    socketWatcher(dispatch);
  }, [authToken]);

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
