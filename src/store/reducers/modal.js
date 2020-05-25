import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  isOpen: null,
  setModal: ['status', 'data'],
});

export default Creators;

export const INITIAL_STATE = Immutable({
  isOpen: null,
  modalContent: null,
});

export const setModal = (state, actions) => {
  const { status, data } = actions;
  return state.merge({
    isOpen: status,
    modalContent: data,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MODAL]: setModal,
});
