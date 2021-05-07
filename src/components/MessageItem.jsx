import React from 'react';

const MessageItem = ({ username, body }) => (
  <div className="text-break">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

export default MessageItem;
