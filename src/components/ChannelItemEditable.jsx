import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../slices/channelsSlice';
import { openModal } from '../slices/modalSlice';

const ChannelItemEditable = ({ commonProps }) => {
  const { t } = useTranslation();
  const { name, id, isActive } = commonProps;
  const type = isActive ? 'secondary' : 'light';
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setCurrentChannel({ id }));
  };

  const renameHandler = () => {
    dispatch(openModal({ type: 'renameChannel', extra: { id } }));
  };

  const removeHandler = () => {
    dispatch(openModal({ type: 'removeChannel', extra: { id } }));
  };

  return (
    <Dropdown className="d-flex w-100" as={ButtonGroup}>
      <Button onClick={clickHandler} className="text-start px-4 rounded-0 flex-grow-1 text-truncate" title={name} variant={type}>
        <span className="me-3">#</span>
        {name}
      </Button>
      <Dropdown.Toggle className="flex-grow-0 rounded-0" split variant={type} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={removeHandler}>{t('ui.channels.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={renameHandler}>{t('ui.channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelItemEditable;
