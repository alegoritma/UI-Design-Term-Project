import { ADD_FIXED_EXP, ADD_BILL, ADD_PAYMENT} from './constants';

export const activities = {
  payments: [
    {
      paidBy: 'Jack',
      date: '2019.11.15',
      name: 'Beers',
      cost: 30,
      weights: [
        {name: 'Jack', weight: 0.5},
        {name: 'Jason', weight: 0.25},
        {name: 'Travor', weight: 0.25}
      ]
    },{
      paidBy: 'Jason',
      date: '2019.11.15',
      name: 'House Keeping',
      cost: 100,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    },{
      paidBy: 'Jack',
      date: '2019.11.10',
      name: 'Grocery',
      cost: 30,
      weights: [
        {name: 'Jack', weight: 2/3},
        {name: 'Jason', weight: 1/6},
        {name: 'Travor', weight: 1/6}
      ]
    },{
      paidBy: 'Travor',
      date: '2019.11.06',
      name: 'Chicken',
      cost: 20,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 2/3},
      ]
    },{
      paidBy: 'Jack',
      date: '2019.11.05',
      name: 'Cinema Tickets',
      cost: 27,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    },{
      paidBy: 'Jason',
      date: '2019.11.03',
      name: 'Whiskey',
      cost: 40,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    },{
      paidBy: 'Jason',
      date: '2019.11.01',
      name: 'Car Fuel',
      cost: 20,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    },{
      paidBy: 'Jack',
      date: '2019.10.30',
      name: 'Grocery shop for weekend trip',
      cost: 80,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    },{
      paidBy: 'Jack',
      date: '2019.10.29',
      name: 'Chair, tent and other stuff for our weekend trip',
      cost: 20,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    },{
      paidBy: 'Jason',
      date: '2019.10.23',
      name: 'Toilet Paper',
      cost: 20,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    }
  ],
  bills: [
    {
      cost: 80,
      addedBy: "Jason",
      to: 'Internet',
      date: '2019.11.30',
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    }
  ],
  fixedExpenses: [
    {
      addedBy: "Trevor",
      to: 'Rent',
      date: '2019.05.10',
      cost: 1200,
      weights: [
        {name: 'Jack', weight: 1/3},
        {name: 'Jason', weight: 1/3},
        {name: 'Travor', weight: 1/3}
      ]
    }
  ]
};

function activitiesReducer(state = activities, {type, payload}) {
  switch (type) {
    case ADD_FIXED_EXP:
      return {...state, fixedExpenses: [payload, ...state.fixedExpenses]};
    case ADD_BILL:
      return {...state, bills: [payload, ...state.bills]};
    case ADD_PAYMENT:
      return {...state, payments: [payload, ...state.payments]};
    default:
      return state;
  }
}

export default activitiesReducer;
