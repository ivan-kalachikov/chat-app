import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useAuthToken } from '../context';
import { asyncActions } from '../slices';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';

const Chat = () => {
  const { authToken, setAuthToken } = useAuthToken();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncActions.setInitialState({ authToken, setAuthToken }));
  }, [authToken, dispatch, setAuthToken]);

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
