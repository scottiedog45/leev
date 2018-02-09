import * as actions from './actions';

const initialState = {
  members:[],
  services:[],
  error: null,
  singleMemberLeave: []
};

//don't need optimistic UI for everything
//pre-rendered screen, initial view that comes up really fast
//code splitting
//rending on servier
//speeds up percieved performance
//optimistic ui in that category
//redux/react optimistic updates; use tools that are already out there
//optimistic ui update is advanced, save for interviews/keeping skills sharp after finishing mvp
//framework NEXT.js as server side rendering library
//create react app: configures webpack automatcially

//add get fetches here for successful async requests

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
  else if (action.type === actions.FETCH_SINGLE_LEAVE_SUCCESS) {
    console.log('triggered');
    return Object.assign({}, state, {
      singleMemberLeave: action.services
    });
  }
    return state;
  }
