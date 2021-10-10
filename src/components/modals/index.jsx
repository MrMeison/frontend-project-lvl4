import React from 'react';
import { useDispatch } from 'react-redux';
import AddModal from './Add.jsx';
import RemoveModal from './Remove.jsx';
import RenameModal from './Rename.jsx';
import { hideModal } from '../../slices/modal.js';

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

const Modal = ({ modalInfo }) => {
  const dispatch = useDispatch();

  if (!modalInfo.type) {
    return null;
  }
  const Component = modals[modalInfo.type];

  const handleClose = () => {
    dispatch(hideModal());
  };

  return <Component handleClose={handleClose} />;
};

export default Modal;
