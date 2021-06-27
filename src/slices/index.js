import { combineReducers } from '@reduxjs/toolkit';
import modal, { actions as modalActions } from './modal.js';
import channelsInfo, { actions as channelsActions } from './channelsInfo.js';
import messagesInfo, { actions as messageActions } from './messagesInfo.js';

const actions = {
  ...modalActions,
  ...channelsActions,
  ...messageActions,
};

export {
  actions,
};

export default combineReducers({
  modal,
  channelsInfo,
  messagesInfo,
});
