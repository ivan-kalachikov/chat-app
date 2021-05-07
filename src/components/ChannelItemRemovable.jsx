import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const ChannelItemRemovable = ({ name, active }) => {
  const type = active ? 'light' : 'primary';
  return (
    <li className="nav-item">
      <Dropdown className="d-flex mb-2" as={ButtonGroup}>
        <Button className="text-left flex-grow-1" variant={type}>{name}</Button>
        <Dropdown.Toggle className="flex-grow-0" split variant={type} id="dropdown-split-basic" />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default ChannelItemRemovable;
