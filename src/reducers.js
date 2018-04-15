import * as actions from './actions';

const initialState = {
  members:[],
  services:[],
  error: null,
  singleMemberLeave: [],
  token: '',
  loading: false,
  loggedIn: true
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
    // sessionStorage.setItem('members': action.members);
    return Object.assign({}, state, {
      members: action.members
    });
  } else if (action.type === actions.FETCH_SERVICES_SUCCESS) {
    // sessionStorage.setItem('services': action.services);
    return Object.assign({}, state, {
      services: action.services
    });
  } else if (action.type === actions.FETCH_SINGLE_LEAVE_SUCCESS) {
    return Object.assign({}, state, {
      singleMemberLeave: action.services
    });
  } else if (action.type === actions.SET_TOKEN) {
    console.log(action.token);
    return Object.assign({}, state, {
      token: action.token,
      loggedIn: true
    });
  } else if (action.type === actions.LOG_OUT) {
    return Object.assign({}, state, {
      token: '',
      loggedIn: false
    });
  } else if (action.type === actions.BEGIN_LOADING_STATE) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === actions.END_LOADING_STATE) {
    return Object.assign({}, state, {
      loading: false
    })
  }
    return state;
  }
