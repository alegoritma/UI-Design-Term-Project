import {CHANGE_ACTIVE, UPDATE_FIELDS, UPDATE_ACT_TYPE, RESET} from './constants';

// First I thought activities may have different data fields,
// later I realized that they can have same field names.
// Since I wrote other parts according to this object structure,
// I will follow the firmer, rather than revising it.

export const newActivity = {
  active: false,
  activityType: "payments", // oneof: payments, bills, fixedExpenses
  fields: {
    paidBy: '',
    date: '', //2019.11.15
    name: '',
    cost: 0,
    weights: [] //[{name: '', weight: 0.00 }]
  },
  // other: {
  //   addedBy: '',
  //   date: '', //2019.11.15
  //   to: '',
  //   cost: 0,
  //   weights: [] //[{name: '', weight: 0.00 }]
  // }
}


function newActivityReducer(state = newActivity, {type, payload}) {
  switch (type) {
    case CHANGE_ACTIVE:
      return {...state, active: payload} // To show modal
    case UPDATE_ACT_TYPE:
      return {...state, activityType: payload}
    case UPDATE_FIELDS:
      return {...state, fields: {...state.fields, ...payload}}
    case RESET:
      return {...state, active: false}; // initial state
    default:
      return state;
  }
}

export default newActivityReducer;
