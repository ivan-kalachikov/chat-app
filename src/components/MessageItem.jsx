import React, { useRef, useEffect } from 'react';

const MessageItem = ({ username, body, isFirst }) => {
  const msgRef = useRef(null);
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  });
  return (
    <div className={`text-break mb-2 ${isFirst && 'mt-auto'}`} ref={msgRef}>
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );
};

export default MessageItem;
