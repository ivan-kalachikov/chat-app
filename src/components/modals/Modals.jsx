import React from 'react';
import ModalAddChannel from './ModalNewChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';

const Modals = () => (
  <>
    <ModalAddChannel />
    <ModalRemoveChannel />
    <ModalRenameChannel />
  </>
);

export default Modals;
