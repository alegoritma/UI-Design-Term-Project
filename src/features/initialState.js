import {activities} from './activities/reducers';
import {house} from './house/reducers';
import {newActivity} from './newActivity/reducers';

let initialState = {
  activities,
  house,
  newActivity
}
export default initialState;
