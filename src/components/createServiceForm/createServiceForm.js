import React from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import {postService} from '../../actions';
import './createServiceForm.css';
import styled from 'styled-components'

const CreateButton = styled.button`
  height: 40px;
  width: 128px;
  border-radius: 7px;
  position: fixed;
  margin-left: 20px;
  background-color: #EB5E28;
  border: none;
  color: #FFFCF2;
  font-size: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
`;

const Input = styled.input`
  width: 200px;
`;

const FormTitle = styled.p`
  font-size: 20px;
`;

const FormWrapper = styled.div`
  background-color: lightgrey;
  overflow: auto;
  color: #FFFCF2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Form = styled.form`
  font-size: 16px;
`;

const CategoryWrapper = styled.div`
margin: 10px;
margin-top: 20px;
text-align: left;
`;

const DateTimeWrapper = styled.div`
margin: 10px;
margin-top: 20px;
text-align: left;
`;

const ButtonWrapper = styled.div`
  margin: 10px;
  text-align: center;
  justify-content: space-around;
  display: flex;
  margin-top:20px;
`;

const Button = styled.button`
  width: 70px;
  background-color: #EB5E28;
  color: black;
  border: none;
  height: 25px;

`;

const Legend = styled.legend`
  margin-bottom: 4px;
  font-size: 17px;
`;


export class CreateServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  onSubmit(values) {
    this.toggleEditing();
    this.props.dispatch(postService(values));
    this.props.dispatch(reset('service'))
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    })
  }

  render() {

    return (
      <FormWrapper>
      {
      !this.state.editing ? <CreateButton onClick={()=>this.toggleEditing()}>Create Service</CreateButton> :

      <Form className ='serviceForm' onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
            )}>
      <FormTitle>Create Service</FormTitle>
      <CategoryWrapper>
        <Legend>Type</Legend>
        <Input name='category' id='category' type = 'text' component='input'/>
      </CategoryWrapper>
      <DateTimeWrapper>
        <Legend>Date Time</Legend>
        <Field name='dateTime' id='dateTime' type='datetime-local' component='input'/>
      </DateTimeWrapper>
      <ButtonWrapper>
        <Button type='submit'>Submit</Button>
        <Button type='cancel' onClick={()=>this.toggleEditing()}>Cancel</Button>
      </ButtonWrapper>
      </Form>
    }
  </FormWrapper>);
  }
}


export default CreateServiceForm = reduxForm({
  form:'service'
})(CreateServiceForm);
