import {INIT} from './constants';

export const house = {
  users: [ 'Jack', 'Jason', 'Travor'],
  currentUser: 'Jack'
}

function houseReducer(state = house, {type, payload}){
  switch (type) {
    case INIT:
      return state;
      break;
    default:
      return state;
  }
}
export default houseReducer;
