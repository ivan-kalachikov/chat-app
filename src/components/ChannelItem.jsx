import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../slices/chatDataSlice';

const ChannelItem = ({ name, active, id }) => {
  const classNames = cn('nav-link btn-block mb-2 text-left btn',
    {
      'btn-primary': active,
      'btn-light': !active,
    });
  const dispatch = useDispatch();
  const clickHandler = (channelId) => () => {
    dispatch(setActiveChannel(channelId));
  };
  return (
    <li className="nav-item">
      <button onClick={clickHandler(id)} type="button" className={classNames}>{name}</button>
    </li>
  );
};

export default ChannelItem;
