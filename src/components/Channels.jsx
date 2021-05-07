import React from 'react';
import ChannelItem from './ChannelItem.jsx';
import ChannelItemRemovable from './ChannelItemRemovable.jsx';

const Channels = ({ channelsList, currentChannelId }) => (
  channelsList && (
  <div className="col-3 border-right">
    <div className="d-flex mb-2">
      <span>Каналы</span>
      <button type="button" className="ml-auto p-0 btn btn-link">+</button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill">
      {channelsList && channelsList.map(({ id, name, removable }) => (
        removable
          ? (
            <ChannelItemRemovable
              key={id}
              name={name}
              active={id === currentChannelId}
              id={id}
            />
          )
          : (
            <ChannelItem
              key={id}
              name={name}
              active={id === currentChannelId}
              id={id}
            />
          )))}
    </ul>
  </div>
  )
);

export default Channels;
