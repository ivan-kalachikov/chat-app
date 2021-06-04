import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import uniqueId from 'lodash/uniqueId';
import MessageItem from './MessageItem.jsx';
import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const messages = useSelector((state) => state.messagesInfo.messages
    .filter(({ channelId }) => channelId === currentChannelId));
  const currentChannelName = channels.find(({ id }) => id === currentChannelId)?.name;
  const messagesCount = messages.length;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {!!channels.length && `# ${currentChannelName}`}
            </b>
          </p>
          <span className="text-muted">{t('ui.messages.count', { count: messagesCount })}</span>
        </div>
        <div id="messages-box" className="chat-messages px-5 d-flex flex-grow-1 flex-column overflow-auto">
          {messages && messages.map(({ username: name, body }, i) => (
            <MessageItem key={uniqueId()} body={body} username={name} isFirst={i === 0} />
          ))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
