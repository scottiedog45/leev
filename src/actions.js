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
    }).then(res => res.sort(function(a,b) {return (a.name >b.name) ? 1 : ((b.name > a.name) ? -1 : 0
    );}))
    .then(members => {
      dispatch(fetchMembersSuccess(members));
    }).catch(err => {
      dispatch(fetchMembersError(err));
  });
};

export const fetchServices = () => dispatch => {
  console.log('doing this');
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
  .then(() => {
    dispatch(fetchServices())
  })
  .catch(error => console.error('Error:', error))
  .then(success => console.log('Success:', success))
}


export const putOneToService = (memberId, serviceId) => dispatch => {
  let id = serviceId;
  console.log(memberId, id);
  let datas = {
    id: memberId,
    leave: ''
  };
  fetch('http://localhost:8000/leev/services/' + id, {
    method: 'PUT',
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

export const putManyToService = (members, id) => dispatch => {
  console.log(members, id);
  let datas = {
    members: members
  }
  fetch('http://localhost:8000/leev/services/many/' + id, {
    method: 'PUT',
    body: JSON.stringify(datas),
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


export const putLeave = (reason, member, service) => dispatch => {
  console.log(reason, member, service);
  let datas = {
    id: service,
    member: member,
    leave: reason
  }
  console.log(datas);
  fetch('http://localhost:8000/leev/services/' + service + '/'+ member, {
    method: 'PUT',
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
  console.log('blah');
  fetch('http://localhost:8000/leev/services/'+ id, {
    method: 'GET',
    datatype: 'json'
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    console.log(res.members);
    return res.json();
  }).catch(err => {
    console.error(err)})
    .then(res => console.log(res))
  };


export const postMember = (values) => dispatch => {
  console.log(values);
  fetch('http://localhost:8000/leev/members', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res=>res.json())
  //only add to state if POST is succsfful, use ID from post and show error to user
  .then(() => {
    dispatch(fetchMembers())
  })
}

export const deleteService = (id) => dispatch => {
  fetch('http://localhost:8000/leev/services/' + id, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) {
    return Promise.reject(res.statusText);
  }})
  .then(() => {
    dispatch(fetchServices())
  })
}

//when deleting need to delete from all associated records

export const deleteMember = (id) => dispatch => {
  fetch('http://localhost:8000/leev/members/' + id, {
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
  console.log(member, service);
  fetch('http://localhost:8000/leev/services/' + service + '/' + member, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }})
    .then(() => {
      dispatch(fetchServices())
    })
}
