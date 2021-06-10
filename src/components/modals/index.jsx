import React from 'react';
import { useSelector } from 'react-redux';
import ModalAddChannel from './ModalNewChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ConnectionProblem from './ModalConnectionProblem.jsx';

const modalByType = {
  addChannel: <ModalAddChannel />,
  removeChannel: <ModalRemoveChannel />,
  renameChannel: <ModalRenameChannel />,
  connectionProblem: <ConnectionProblem />,
};

const Modals = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.type);
  return (isOpen && modalByType[modalType]) || null;
};

export default Modals;
