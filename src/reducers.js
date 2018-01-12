import * as actions from './actions';


const initialState = {
  personnel:
    [{
      id: 3,
      name: 'John',
      email: 'john@john.com',
      phone: '123-456-7890',
      role: 'violin',
      leave: [{
        'serviceId':'oiwee',
        'reason': 'sick'
      }]
    }]
  ,
  services:
    [{
      serviceId: 7,
      category: 'rehearsal',
      dateTime: '12/08/2017 8:00pm',
      people: ['3', '4', '5']
    }]
  ,
  error: null
};

export function leevReducer(state=initialState, action) {
  if (action.type === actions.ADD_PERSON) {
    let personnel = state.personnel.map((person, index)=> {
      if (index !== action.personnelIndex) {
        return person;
      }
      return Object.assign({}, state, {
        personnel: [...state.personnel, {
          text: action.text
        }]
      });
    });
    return Object.assign({}, state, {
      personnel
    });
  }
  else if (action.type=== actions.ADD_SERVICE) {
    console.log(state.services);
      return Object.assign({}, state, {
        services: [...state.services, {
          people: action.people,
          category: action.category,
          serviceId: action.serviceId,
          dateTime: action.dateTime
        }]
      });
    }
    return state;
  }
