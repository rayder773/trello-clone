import { combineReducers } from 'redux';
import { reducer as tasks } from './tasks';
import { reducer as modal } from './modal';

export default combineReducers({
  tasks,
  modal,
});
