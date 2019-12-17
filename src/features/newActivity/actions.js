import {CHANGE_ACTIVE, UPDATE_FIELDS, UPDATE_ACT_TYPE, RESET} from './constants';

export function updateActive(bool){
  return {
    type: CHANGE_ACTIVE,
    payload: bool
  }
}

export function updateFields(fields){
  return {
    type: UPDATE_FIELDS,
    payload: fields
  }
}
export function reset(){
  return {
    type: RESET
  }
}
export function updateActivityType(actType){
  return {
    type: UPDATE_ACT_TYPE,
    payload: actType
  }
}
