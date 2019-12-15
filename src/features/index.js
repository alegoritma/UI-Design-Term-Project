import { combineReducers } from 'redux';
import activitiesReducer from './activities/reducers';
import houseReducer from './house/reducers';
import newActivityReducer from './newActivity/reducers';

export default combineReducers({
  activities: activitiesReducer,
  house: houseReducer,
  newActivity: newActivityReducer
})
