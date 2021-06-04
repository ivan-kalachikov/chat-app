import React from 'react';
import { Col, Button, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelItem from './ChannelItem.jsx';
import ChannelItemEditable from './ChannelItemEditable.jsx';
import AddIcon from '../../images/add.svg';
import { openModal } from '../../slices/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsList = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const addChannelHandler = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  return (
    <Col xs={2} className="px-0 pt-5 border-end overflow-auto h-100 bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>{t('ui.channels.title')}</span>
        <Button onClick={addChannelHandler} variant="" className="ml-auto p-0 text-primary btn-group-vertical">
          +
        </Button>
      </div>
      <Nav as="ul" variant="pills" className="flex-column nav-pills nav-fill">
        {channelsList && channelsList.map(({ id, name, removable }) => {
          const props = {
            key: id, name, id, isActive: id === currentChannelId,
          };
          return removable
            ? <ChannelItemEditable key={id} commonProps={props} />
            : <ChannelItem key={id} commonProps={props} />;
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
