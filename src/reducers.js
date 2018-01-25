import * as actions from './actions';

const initialState = {
  members:[],
  services:[],
  error: null
};

const overwrite = (arr, index, newItem) => [
  ...arr.slice(0, index), newItem, ...arr.slice(index+1)
]

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index), newItem, ...arr.slice(index)
]

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
  else if (action.type === actions.REMOVE_MEMBER_FROM_SERVICE) {
    let memberId = action.memberId;
    let serviceId = action.serviceId;
    let service = state.services.find(service => service.id === serviceId);
    let newPeople = service.people.filter(person => person !== memberId);
    let adjustedService =  Object.assign({}, service, {
      people: newPeople
    });
    let newServices = state.services.filter(service => service.id !== serviceId);
    return Object.assign({}, state, {
      services: [...newServices, adjustedService]
    });
  }
  else if (action.type === actions.ADD_MEMBER_TO_SERVICE) {
    let memberId = action.memberId;
    let serviceId = action.serviceId;
    let service = state.services.find(service => service.id === serviceId);
    service.people.push(memberId);
    let newPeople = service.people;
    let adjustedService = Object.assign({}, service, {
      people: newPeople
    });
    let newServices = state.services.filter(service=> service.id !== serviceId);
    return Object.assign({}, state, {
      services: [...newServices, adjustedService]
    });
  }
  else if (action.type === actions.CHANGE_LEAVE_REASON) {
    let members = state.members.slice();
    let memberId= action.memberId;
    let serviceId = action.serviceId;
    let leaveReason = action.value;
    let person = (state.members.slice().find(member => member.id === memberId));
    let personIndex = state.members.slice().findIndex(member => member.id === memberId);
    let newLeaveInstance = {
      service: serviceId,
      reason: action.value
    };
    let newLeave = overwrite(person.leave, 0, newLeaveInstance);
    let leaveIndex = person.leave.slice().findIndex(leave => leave.service === serviceId);
    let newPerson = Object.assign({}, person, {
      leave: newLeave
    });
    let newMembers = overwrite(members, personIndex, newPerson);
    if (person.leave.length === 0) {
      return Object.assign({}, state, {
        members: newMembers
      });
    } else {
      let newLeave = overwrite(person.leave, leaveIndex, newLeaveInstance);
      let newPerson = Object.assign({}, person, {
        leave: newLeave
      });
      let newMembers = overwrite(members, personIndex, newPerson);
      return Object.assign({}, state ,{
        members: newMembers
      });
      }
    }
    return state;
  }
