import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../slices/channels';

const ChannelItem = ({ commonProps }) => {
  const { name, id, isActive } = commonProps;
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setCurrentChannel({ id }));
  };

  return (
    <Nav.Item as="li" className="w-100">
      <Button onClick={clickHandler} variant={isActive ? 'secondary' : 'light'} className="px-4 rounded-0 w-100 text-truncate text-start" title={name}>
        <span className="me-3">#</span>
        {name}
      </Button>
    </Nav.Item>
  );
};

export default ChannelItem;
