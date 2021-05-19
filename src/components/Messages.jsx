import React, {
  useEffect, useState, useContext, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import MessageItem from './MessageItem.jsx';
import { addMessage } from '../slices/chatDataSlice';
import AuthContext from './AuthContext.jsx';

const socket = io();

const Messages = ({ messages }) => {
  const [msgState, setMsgState] = useState({
    msg: '',
    state: 'idle',
  });
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const changeHandler = (e) => {
    setMsgState((prevState) => ({ ...prevState, msg: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const newMsg = { body: msgState.msg, channelId: currentChannelId, username };
    setMsgState((prevState) => ({ ...prevState, state: 'pending' }));
    socket.emit('newMessage', newMsg, () => {
      setMsgState((prevState) => ({ ...prevState, state: 'idle' }));
      inputRef.current.focus();
    });
  };
  useEffect(() => {
    inputRef.current.focus();
    socket.on('newMessage', (response) => {
      dispatch(addMessage(response));
      setMsgState((prevState) => ({ ...prevState, msg: '' }));
    });
  }, []);
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages && messages.map(({ username: name, body, id }) => (
            <MessageItem key={id} body={body} username={name} />
          ))}
        </div>
        <div className="mt-auto">
          <form onSubmit={submitHandler} noValidate className="">
            <div className="input-group">
              <input
                onChange={changeHandler}
                name="message"
                aria-label="message"
                className="form-control"
                disabled={msgState.state === 'pending'}
                ref={inputRef}
                value={msgState.msg}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-primary" disabled={msgState.state === 'pending'}>Отправить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
