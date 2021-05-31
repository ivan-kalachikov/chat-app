import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.extra = action.payload.extra;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.extra = null;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { openModal, closeModal } = actions;
export default reducer;
