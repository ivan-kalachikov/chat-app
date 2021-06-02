import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import AuthContext from './AuthContext.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { setInitialState } from '../slices/channelsSlice';
import { socketWatcher } from '../socket';

const Chat = () => {
  const { auth } = useContext(AuthContext);
  const { authToken } = auth;
  const dispatch = useDispatch();
  useEffect(() => {
    socketWatcher(dispatch);
    dispatch(setInitialState(authToken));
  }, [authToken]);

  return (
    <AuthContext.Consumer>
      {() => (
        <Container className="my-4 overflow-hidden flex-grow-1 rounded shadow">
          <Row className="h-100 overflow-auto bg-white">
            <Channels />
            <Messages />
          </Row>
        </Container>
      )}
    </AuthContext.Consumer>
  );
};

export default Chat;
