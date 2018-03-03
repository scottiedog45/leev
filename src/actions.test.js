import {fetchMembersSuccess, fetchServicesSuccess} from './actions'

const members=['a', 'b', 'c']
const services = ['a', 'b', 'c']

describe('fetchMembersSuccess', () => {
  it('Should return the action', ()=> {
    const action = fetchMembersSuccess(members);
    expect(action.type).toEqual('FETCH_MEMBERS_SUCCESS');
    expect(action.members).toEqual(members);
  });
});

describe('fetchServicesSuccess', ()=> {
  it('Should return the action', ()=> {
    const action = fetchServicesSuccess(services);
    expect(action.type).toEqual('FETCH_SERVICES_SUCCESS');
    expect(action.services).toEqual(services);
  });
});
