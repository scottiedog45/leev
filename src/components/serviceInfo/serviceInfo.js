import React from 'react';
import moment from 'moment';
import {Field, reduxForm, reset} from 'redux-form';
import {patchToService, fetchServices} from '../../actions'

export class ServiceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      dateTimeValue: moment(this.props.service.dateTime, "dddd, MMMM Do YYYY, h:mm a").format('YYYY-MM-DDThh:mm'),
      category: this.props.service.category
    }
  }

  //use toggle on these instead
  //make all of this a redux form
  //single editing button
  //check which lines have been edited
  //need to set
  //change this to editing everything once editing is selected
  componentWillMount() {
    this.props.initialize({
      dateTimeValue: moment(this.props.service.dateTime, "dddd, MMMM Do YYYY, h:mm a").format('YYYY-MM-DDThh:mm'),
      category: this.props.service.category
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dateTimeValue: moment(nextProps.service.dateTime, "dddd, MMMM Do YYYY, h:mm a").format('YYYY-MM-DDThh:mm'),
      category: nextProps.service.category
    })
  }

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    });
    console.log('editing');
    console.log(this.state.editing);
  }

  handleDateChange = (e) => {
    this.setState({
      dateTimeValue: e.target.value
    })
  }

  handleCategoryChange= (e) => {
    this.setState({
      category: e.target.value
    })
  }

  onSubmit = (values) => {
    console.log(values);
    this.props.dispatch(patchToService(values, this.props.service.id))
    this.setState({
      editing: false
    });
    this.props.dispatch(fetchServices());
  }

  render() {

    return (
      <div>
        <h2>{!this.state.editing && this.props.service.dateTime}</h2>
        <h3>{!this.state.editing && this.props.service.category}</h3>
        {!this.state.editing && <button onClick={()=>this.toggleEditing()}>Edit Service Info</button>}
        {this.state.editing &&
          <form onSubmit={this.props.handleSubmit((values)=>(this.onSubmit(values)))}>
            <label>Edit the DateTime </label>
            <Field
              name ='dateTime'
              component = 'input'
              type='datetime-local'
              onChange={(e)=>this.handleDateChange(e)}
              value={this.state.dateTimeValue}
            />
            <label>Edit category</label>
            <Field
              name='category'
              component = 'input'
              type='text'
              onChange={(e)=>this.handleCategoryChange(e)}
              value={this.state.category}
              />
            <button type='submit'>Submit</button>
            <button onClick={()=>this.toggleEditing()} type='button'>Cancel</button>
          </form>}
      </div>
    )
  }
}


export default ServiceInfo = reduxForm({
  form:'serviceInfo',
})(ServiceInfo);
