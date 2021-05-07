import React from 'react';
import MessageItem from './MessageItem.jsx';

const Messages = ({ messages }) => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {messages && messages.map(({ username, body, id }) => (
          <MessageItem key={id} body={body} username={username} />
        ))}
      </div>
      <div className="mt-auto">
        <form noValidate className="">
          <div className="input-group">
            <input name="body" aria-label="body" className="form-control" value="" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-primary">Отправить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Messages;
