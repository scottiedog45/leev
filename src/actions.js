export const ADD_SERVICE = 'ADD_SERVICE';
export const addService = (value) => ({
  type: ADD_SERVICE,
  dateTime: value.datetime,
  category: value.category,
  people: [],
  serviceId: '8'
});

export const ADD_PERSON = 'ADD_PERSON';
export const addPerson = () => ({
  type: ADD_PERSON
});
