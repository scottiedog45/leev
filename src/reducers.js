import * as actions from './actions';


const initialState = {
  personnel: [],
  services: [],
  error: null
}

export const leevReducer = (state=initialState, action) => {
  if (actions.type === actions.ADD_PERSON) {
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
  else if (actions.type=== actions.ADD_SERVICE) {
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
}
