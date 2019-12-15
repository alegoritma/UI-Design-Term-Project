import {CHANGE_ACTIVE, UPDATE_FIELDS, RESET} from './constants';

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
