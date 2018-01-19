import * as actions from './actions';

const initialState = {
  members:[],
  services:[],
  error: null
};

export function leevReducer(state=initialState, action) {
  if(action.type === actions.FETCH_MEMBERS_SUCCESS) {
    return Object.assign({}, state, {
      members: action.members
    });
  }
  else if(action.type === actions.FETCH_SERVICES_SUCCESS){
    return Object.assign({}, state, {
      services: action.services
    });
  }
  else if (action.type === actions.ADD_MEMBER_TO_STATE) {
    console.log(state.members);
    return Object.assign({}, state, {
      members: [...state.members, {
        name: action.name,
        role: action.role,
        email: action.email,
        phone: action.phone,
        services: action.services,
        memberId: action.memberId
      }]
    });
  }
  else if (action.type=== actions.ADD_SERVICE_TO_STATE) {
    console.log(state.services);
      return Object.assign({}, state, {
        services: [...state.services, {
          people: action.people,
          category: action.category,
          serviceId: action.serviceId,
          members: action.members,
          dateTime: action.dateTime
        }]
      });
    }
  else if (action.type === actions.REMOVE_SERVICE_FROM_STATE) {
    let id = action.id;
    let newServices = state.services.filter(service => service.id !== id);
    return Object.assign({}, state, {
      services: newServices
    });
  }
  else if (action.type === actions.REMOVE_MEMBER_FROM_STATE) {
    let id = action.id;
    let newMembers = state.members.filter(member=> member.id !== id);
    return Object.assign({}, state, {
      members: newMembers
    });
  }
    return state;
  }
