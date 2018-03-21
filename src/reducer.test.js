import {leevReducer} from './reducers'
import {fetchMembersSuccess} from './actions'

describe('leevReducer', ()=> {
  const members = ['a', 'b', 'c'];
  const services = ['a', 'b', 'c'];

  it('Should set the initial state when nothing is passed in', ()=> {
    const state=leevReducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual({
      members:[],
      services:[],
      error: null,
      singleMemberLeave: [],
      token: '',
      loading: false
    });
  });

  it('should return the current state on an unknown action', () => {
    let currentState = {};
    const state = leevReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('fetchMembersSuccess', ()=> {
    it('should add all members', ()=> {
      let state;
      state = leevReducer(state, fetchMembersSuccess(members));
      expect(state).toEqual({
        members,
        services:[],
        error: null,
        singleMemberLeave: [],
        token: '',
        loading: false
      });
    });
  });
});
