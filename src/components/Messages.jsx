import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import {
  Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import socket from '../socket';
import MessageItem from './MessageItem.jsx';
import AuthContext from './AuthContext.jsx';
import SendIcon from '../images/send.svg';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const messages = useSelector((state) => state.messagesInfo.messages
    .filter(({ channelId }) => channelId === currentChannelId)) ?? [];
  const { auth } = useContext(AuthContext);
  const { username } = auth;

  const [msgState, setMsgState] = useState({
    msg: '',
    state: 'idle',
  });

  const inputRef = useRef(null);

  const changeHandler = (e) => {
    setMsgState((prevState) => ({ ...prevState, msg: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newMsg = { body: msgState.msg, channelId: currentChannelId, username };
    setMsgState((prevState) => ({ ...prevState, state: 'pending' }));
    socket.emit('newMessage', newMsg, () => {
      setMsgState((prevState) => ({ ...prevState, state: 'idle', msg: '' }));
      inputRef.current.focus();
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {!!channels.length && `# ${channels.find(({ id }) => id === currentChannelId)?.name}`}
            </b>
          </p>
          <span className="text-muted">{`${messages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages px-5 d-flex flex-grow-1 flex-column overflow-auto">
          {messages && messages.map(({ username: name, body, id }, i) => (
            <MessageItem key={id} body={body} username={name} isFirst={i === 0} />
          ))}
        </div>
        <div className="border-top py-3 px-5">
          <Form onSubmit={submitHandler} noValidate>
            <InputGroup>
              <Form.Control
                type="text"
                onChange={changeHandler}
                name="message"
                className="border-0"
                disabled={msgState.state === 'pending'}
                ref={inputRef}
                value={msgState.msg}
                placeholder="Введите сообщение..."
                required
              />
              <Button variant="" type="submit" disabled={msgState.state === 'pending'}>
                <SendIcon />
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
