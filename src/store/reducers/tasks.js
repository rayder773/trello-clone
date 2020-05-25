import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  setIsNewCreating: ['isNewCreating'],
  setData: ['data'],
});

export default Creators;

export const INITIAL_STATE = Immutable({
  tasks: null,
  columns: null,
  isNewCreating: false,
});

export const setIsNewCreating = (state, actions) => {
  const { isNewCreating } = actions;
  return state.merge({ isNewCreating });
};

export const setData = (state, actions) => {
  const { data: { columns = state.columns, tasks } } = actions;
  return state.merge({
    columns,
    tasks,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: setData,
  [Types.SET_IS_NEW_CREATING]: setIsNewCreating,
});
