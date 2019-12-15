import { ADD_FIXED_EXP, ADD_BILL, ADD_PAYMENT} from './constants';

function renameFields({paidBy, date, name, cost, weights}){
  // See explanation at ../newAcivity/reducers.js
  return {addedBy: paidBy, date, to: name, cost, weights}
}

export function submitActivity(activityType, fields){
  if (activityType === 'bills'){
    return {
      type: ADD_BILL,
      payload: renameFields(fields)
    }
  } else if(activityType === "fixedExpenses"){
    return {
      type: ADD_FIXED_EXP,
      payload: renameFields(fields)
    }
  } else if (activityType === 'payments') {
    return {
      type: ADD_PAYMENT,
      payload: fields
    }
  } else {
    console.error('Unvalid Activity Type: ', activityType)
  }
}
