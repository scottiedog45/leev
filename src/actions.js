export const ADD_SERVICE_TO_STATE = 'ADD_SERVICE_TO_STATE';
export const addServiceToState = (values, res) => ({
  type: ADD_SERVICE_TO_STATE,
  dateTime: values.dateTime,
  category: values.category,
  people: [],
  serviceId: res.id
});

export const ADD_MEMBER_TO_STATE = 'ADD_MEMBER_TO_STATE';
export const addMemberToState = (values, res) => ({
  type: ADD_MEMBER_TO_STATE,
  name: values.name,
  role: values.role,
  email: values.email,
  phone: values.phone,
  services: [],
  memberId: res.id
});

export const REMOVE_SERVICE_FROM_STATE = 'REMOVE_SERVICE_FROM_STATE';
export const removeServiceFromState = (id) => ({
  type: REMOVE_SERVICE_FROM_STATE,
  id: id
});

export const REMOVE_MEMBER_FROM_STATE = 'REMOVE_MEMBER_FROM_STATE';
export const removeMemberFromState = (id) => ({
  type: REMOVE_MEMBER_FROM_STATE,
  id: id
});

export const ADD_PERSON = 'ADD_PERSON';
export const addPerson = () => ({
  type: ADD_PERSON
});

export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';
export const fetchMembersSuccess = members => ({
  type: FETCH_MEMBERS_SUCCESS,
  members
})

export const FETCH_MEMBERS_ERROR = 'FETCH_MEMBERS_ERROR';
export const fetchMembersError = error => ({
  type: FETCH_MEMBERS_ERROR,
  error: 'error with members fetch'
})

// export const FETCH_MEMBERS_REQUEST = 'FETCH_MEMBERS_REQUEST';
// export const fetchMembersRequest = request => ({
//   type: FETCH_MEMBERS_REQUEST,
//   loading: true
// })

export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const fetchServicesSuccess = services => ({
  type: FETCH_SERVICES_SUCCESS,
  services
})

export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';
export const fetchServicesError = error => ({
  type: FETCH_SERVICES_ERROR,
  error: 'error with services fetch'
})

export const fetchMembers = () => dispatch => {
  // dispatch(fetchMembersRequest()); load spinner
  fetch('http://localhost:8000/leev/members', {
    method: 'GET',
    datatype: 'json'
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    }).then(members => {
      dispatch(fetchMembersSuccess(members));
    }).catch(err => {
      dispatch(fetchMembersError(err));
  });
};

export const fetchServices = () => dispatch => {
  fetch('http://localhost:8000/leev/services', {
    method: 'GET',
    datatype: 'json'
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    }).then(services => {
      dispatch(fetchServicesSuccess(services));
    }).catch(err => {
      dispatch(fetchServicesError(err));
    });
};

export const postService = (values) => dispatch => {
  console.log(values);
  fetch('http://localhost:8000/leev/services', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res=>res.json())
  .catch(error => console.error('Error:', error))
  .then(success => console.log('Success:', success))
  .then(res => {
    dispatch(addServiceToState(values, res))
  });
}

export const postMember = (values) => dispatch => {
  console.log(values);
  fetch('http://localhost:8000/leev/members', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res=>res.json())
  .then(res => {
    dispatch(addMemberToState(values, res))
  });
}

export const deleteService = (id) => dispatch => {
  fetch('http://localhost:8000/leev/services/' + id, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) {
    return Promise.reject(res.statusText);
  }})
  .then(res => {
    dispatch(removeServiceFromState(id))
  });
}

export const deleteMember = (id) => dispatch => {
  fetch('http://localhost:8000/leev/members/' + id, {
    method: 'DELETE'
  }).then(res=> {
    if (!res.ok) {
      return Promise.reject(res.statusText);
  }})
  .then(res => {
    dispatch(removeMemberFromState(id))
  });
}

// export const putService = (id) => dispatch
