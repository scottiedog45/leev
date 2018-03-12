import {API_BASE_URL} from './config';
import moment from 'moment';
import store from 'store';


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

export const FETCH_SINGLE_LEAVE_SUCCESS = 'FETCH_SINGLE_LEAVE_SUCCESS';
export const fetchSingleLeaveSuccess = services => ({
  type: FETCH_SINGLE_LEAVE_SUCCESS,
  services
})

export const SET_TOKEN = 'SET_TOKEN';
export const setToken = token => ({
  type: SET_TOKEN,
  token
})

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => ({
  type: LOG_OUT
});

const setSessionToken = (token) => {
  store.set('sessionToken', {token});
}

const getToken = () => {
  console.log('getting');
  let token = store.get('sessionToken');
  return token;
}

const removeToken = () => {
  store.remove('sessionToken')
}

export const createNewUser = (creds) => dispatch => {
  fetch(API_BASE_URL + '/users/signup', {
    method: 'POST',
    datatype: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(response=> {
    console.log(response);
  })
  .then(()=>{
    dispatch(userLogin(creds))
  }
  )
  .catch(err => {
    console.log(err);
  });
}

export const userLogin = (data) =>  dispatch => {
  fetch(API_BASE_URL + '/users/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(responseData => {
    if (!responseData.ok) {
      return Promise.reject(data.statusText);
    }
    return responseData.json();
  })
  .then(payload => {
    setSessionToken(payload.token);
  })
  .then(()=> {
    let token = getToken();
    dispatch(setToken(token.token));
  })
  .then(() => {
    dispatch(fetchMembers());
    dispatch(fetchServices());
  })
  .catch(err => {
    console.log(err)
  });
}

export const userLogout = () => dispatch => {
  removeToken();
  dispatch(logOut());
}

export const fetchMembers = () => dispatch => {
  let someToken = getToken();
  fetch(API_BASE_URL + '/members', {
    method: 'GET',
    datatype: 'json',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${someToken.token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => res.sort(function(a,b) {return (a.name >b.name) ? 1 : ((b.name > a.name) ? -1 : 0
    );}))
    .then(members => {
      dispatch(fetchMembersSuccess(members));
    }).catch(err => {
      dispatch(fetchMembersError(err));
  });
};



export const loadMembersIfNeeded = (token) => {
  return (dispatch, getState) => {
    if (getState().leev.members.length > 0) {
      return;
    }
    dispatch(fetchMembers(token));
  }
}

export const fetchServices = () => dispatch => {
  fetch(API_BASE_URL + '/services', {
    method: 'GET',
    datatype: 'json'
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(services => services.sort(function(a,b) {return b.dateTime>a.dateTime})
    // .map(
    //   (obj) => (
    //     Object.assign({}, obj, {
    //       dateTime: moment(obj.dateTime).format("dddd, MMMM Do YYYY, h:mm a")
    //     }
    // )))
  )
    .then(services => {
      dispatch(fetchServicesSuccess(services));
    }).catch(err => {
      dispatch(fetchServicesError(err));
    });
};

export const getSingleLeave = (memberId) => dispatch => {
  fetch(API_BASE_URL + '/members/'+ memberId + '/leave', {
    method: 'GET',
    datatype: 'json'
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(services => services.sort(function(a,b) {return b.dateTime>a.dateTime}).map(
    (obj) => (
      Object.assign({}, obj, {
        dateTime: moment(obj.dateTime).format("dddd, MMMM Do YYYY, h:mm a")
      }
  ))))
  .then(services => {
    dispatch(fetchSingleLeaveSuccess(services));
  }).catch(err => {
    dispatch(fetchServicesError(err));
  });
};

export const postService = (values) => dispatch => {
  fetch(API_BASE_URL + '/services', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res=>{
    return res.json()
  })
  .then(() => {
    dispatch(fetchServices())
  })
  .catch(error => console.error('Error:', error))
  .then(success => console.log('Success:', success))
}

export const putOneToService = (memberId, serviceId) => dispatch => {
  let id = serviceId;
  let datas = {
    id: memberId,
    leave: ''
  };
  fetch(API_BASE_URL + '/services/' + id + '/members', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(datas)
  }).then(res=>res.json())
  .catch(error => console.error('Error:', error))
  .then(success => console.log('Success:', success))
  .then(() => {
    dispatch(fetchServices())
  })
}

export const patchToService = (data, id) => dispatch => {
  fetch(API_BASE_URL + '/services/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
    "Content-Type": "application/json"
    },
    mode: 'cors',
    header: {
      'Access-Control-Allow-Origin': '*'
    }})
    .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
  })
  .then(() => {
    dispatch(fetchServices())
  });
}

export const patchLeave = (reason, member, service) => dispatch => {
  let datas = {
    id: service,
    member: member,
    leave: reason
  }
  fetch(API_BASE_URL + '/services/' + service + '/members/'+ member, {
    method: 'PATCH',
    body: JSON.stringify(datas),
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
    header: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
  }).catch(err=> {
    console.error(err)
  }).then(() => {
    dispatch(fetchServices())
  })
}

export const fetchSingleServiceInfo = (id) => dispatch => {
  fetch(API_BASE_URL + 'services/'+ id, {
    method: 'GET',
    datatype: 'json'
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).catch(err => {
    console.error(err)})
    .then(res => console.log(res))
  };

export const postMember = (values) => dispatch => {
  fetch(API_BASE_URL + '/members', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res=>res.json())
  .then(() => {
    dispatch(fetchMembers())
  })
}

export const patchInfoToMember = (id, values) => dispatch => {
  fetch(API_BASE_URL + '/members/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
  }).catch(err=> {
    console.error(err)
  }).then(() => {
    dispatch(fetchServices());
    dispatch(fetchMembers());
  })
}

export const deleteService = (id) => dispatch => {
  fetch(API_BASE_URL + '/services/' + id, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) {
    return Promise.reject(res.statusText);
  }})
  .then(() => {
    dispatch(fetchServices())
  })
}

export const deleteMember = (id) => dispatch => {
  fetch(API_BASE_URL + '/members/' + id, {
    method: 'DELETE'
  }).then(res=> {
    if (!res.ok) {
      return Promise.reject(res.statusText);
  }})
  .then(() => {
    dispatch(fetchMembers())
  })
}

export const deleteMemberFromService = (member, service) => dispatch => {
  fetch(API_BASE_URL + '/services/' + service + '/members/' + member, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }})
    .then(() => {
      dispatch(fetchServices())
    })
}
