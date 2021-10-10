/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modal',
  initialState: {
    modalInfo: { type: null, item: null, show: false },
  },
  reducers: {
    setModal: (state, { payload }) => {
      state.modalInfo = { type: payload.type, item: payload.item || null, show: true };
    },
    hideModal: (state) => {
      state.modalInfo = { type: null, item: null, show: false };
    },
  },
});

export const { setModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
