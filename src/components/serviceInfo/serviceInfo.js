import React from 'react';
import moment from 'moment';

export class ServiceInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      editingDateTime: false,
      editingCategory: false,
    }
  }

  //use toggle on these instead

  editDateTime = () => {
    this.setState({
      editDateTime: true
    });
    console.log('editing');
  }

  cancelEditDateTime = () => {
    this.setState({
      editDateTime: false
    });
  }

  editCategory = () => {
    this.setState({
      editCategory: true
    })
  }

  cancelEditCategory = () => {
    this.setState({
      editCategory: false
    })
  }

  render() {

    return (
      <div>
        <h2>{!this.state.editDateTime && this.props.service.dateTime}</h2>
        {!this.state.editDateTime && <button onClick={()=>this.editDateTime()}>Edit date and time informatoin</button>}
        {this.state.editDateTime && <form>
          <label>Edit the DateTime
          <input type='datetime-local' value={moment(this.props.service.dateTime, "dddd, MMMM Do YYYY, h:mm a").format('YYYY-MM-DDThh:mm')}/>
        </label>
        <button type='submit'>changeDateTime</button><button onClick = {()=>this.cancelEditDateTime()} type='button'>Cancel</button>
        </form>}
        <h3>{this.props.service.category}</h3>
        {!this.state.editCategory && <button>Edit Service Type</button>}
      </div>
    )
  }
}
