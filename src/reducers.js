import * as actions from './actions';


const initialState = {
  personnel:
    [{
      id: 3,
      name: 'John',
      email: 'john@john.com',
      phone: '123-456-7890',
      role: 'violin',
      services: {
        services: 7
      },
      leave: '(none)'
    }]
  ,
  services:
    [{
      serviceId: 7,
      type: 'rehearsal',
      dateTime: '12/08/2017 8:00pm',
      expected: 3
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
      return Object.assign({}, person, {
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
    console.log(state.form.services);
    let services = state.services.map((service, index) => {
      if (index !== action.serviceIndex) {
        return service;
      }
      return Object.assign({}, service, {
        services: [...state.services, {
          text: action.text
        }]
      });
    });
    return Object.assign({}, state, {
      services
    });
  }
  return state;
}
