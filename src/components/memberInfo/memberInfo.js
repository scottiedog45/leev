import React from 'react';
import {Field, reduxForm, reset, change} from 'redux-form';
import {patchInfoToMember} from '../../actions'

export class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  };

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  onSubmit = (id, values) => {
    console.log(values);
    this.props.dispatch(patchInfoToMember(id, values));
    this.toggleEditing();
  }

  render() {

    return(

      <div className='memberInfo'>
        <div className='name'>
          <h3>{this.props.member.name}</h3>
      </div>
      <div>
        {!this.state.editing ?
          <div>
            <p className='role'>{this.props.member.role}</p>
            <p className='phone'>{this.props.member.phone}</p>
            <p className='email'>{this.props.member.email}</p>
            <button onClick={()=>this.toggleEditing()}>Edit</button>
          </div> :
          <form onSubmit={this.props.handleSubmit((values)=>(this.onSubmit(this.props.member.id, values)))}>
          <label>Role</label>
            <Field
                label ='role' component='input' type='text' name='role' defaultValue='sdflkj'
            />
            <label>Phone</label>
            <Field
              component='input' type='text' name='phone' value='kkjh'
            />
            <label>Email</label>
            <Field
              component='input' type='text' name='email' 
            />
            <button type='submit'>Submit</button>
          </form>
        }
      </div>
    </div>
    )
  }
}

export default MemberInfo = reduxForm({
  form:'memberInfo'
})(MemberInfo);
