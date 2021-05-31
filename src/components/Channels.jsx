import React from 'react';
import { Col, Button, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ChannelItem from './ChannelItem.jsx';
import ChannelItemEditable from './ChannelItemEditable.jsx';
import AddIcon from '../images/add.svg';
import { openModal } from '../slices/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channelsList = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const addChannelHandler = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };
  return (
    <Col xs={2} className="px-0 pt-5 border-end overflow-auto h-100 bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Каналы</span>
        <Button onClick={addChannelHandler} variant="link" className="ml-auto p-0 btn-group-vertical">
          <AddIcon />
        </Button>
      </div>
      <Nav as="ul" variant="pills" className="flex-column nav-pills nav-fill">
        {channelsList && channelsList.map(({ id, name, removable }) => {
          const props = {
            key: id,
            name,
            id,
            isActive: id === currentChannelId,
          };
          return removable
            ? <ChannelItemEditable key={id} commonProps={props} />
            : <ChannelItem key={id} commonProps={props} />;
        })}
      </Nav>
      {/* <ModalNewChannel /> */}
    </Col>
  );
};

export default Channels;
