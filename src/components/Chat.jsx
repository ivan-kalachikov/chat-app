import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthContext from './AuthContext.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { fetchChatData } from '../slices/chatDataSlice';

const Chat = () => {
  const { auth } = useContext(AuthContext);
  const { authToken } = auth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatData(authToken));
  }, []);
  const channelsList = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const messages = useSelector((state) => state.messages
    .filter(({ channelId }) => channelId === currentChannelId));
  return (
    <AuthContext.Consumer>
      {() => (
        <div className="row flex-grow-1 h-75 pb-3">
          <Channels channelsList={channelsList} currentChannelId={currentChannelId} />
          <Messages messages={messages} />
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default Chat;
