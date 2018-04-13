import React from 'react';
import moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import {patchToService, fetchServices} from '../../actions'
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {media} from '../style-utils'
import {TextField, DatePicker, TimePicker} from 'redux-form-material-ui'

const Service = styled.div`
  padding: 0px;
`;

const DateTime = styled.h2`
  margin-bottom: 3px;
  margin-top: 0px;
  display: inline-block;
  ${media.handheld`
    font-size: 29px;
    text-align: center;
    `}
`;
const Category = styled.h3`
  margin-top: 0px;
  margin-bottom: 6px;
  font-size:15px;
  ${media.handheld`
    text-align: center;
    `}
`;

const Form = styled.form`
  text-align: center;
`;

// const EditButton = styled.button`
//   width: 120px;
//   background-color: #CCC5B9;
//   color: #403d39;
//   border: none;
//   height: 30px;
// `;

const EditButtonWrapper = styled.button`
  background-color: inherit;
  border: none;
  padding-left: 0px;
  ${media.handheld`
    display: block;
    margin-left: auto;
    margin-right: auto;
    `}
`;

const EditButton = styled.span`
  background-color: inherit;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  color: black;
  border: none;
  background-color: #FFFCF2;
  font-size: 30px;
  cursor: pointer;
  transform: translateY(10%);
`;

const SubmitButtonWrapper = styled.span`
`;

const CancelButton = styled.button`
  color: black;
  border: none;
  background-color: #FFFCF2;
  font-size: 30px;
  cursor: pointer;
  transform: translateY(10%);
`;

const CancelButtonWrapper = styled.span``;

const ButtonWrapper = styled.div`
  display: block;
`;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength2 = minLength(2)

const required = value => (value ? undefined : 'Required')

export class ServiceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      time: '3',
      date: '2018-06-01T08:30',
      category: this.props.service.category
    }
  }

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    });
  }


  onSubmit = (values) => {
    this.props.dispatch(patchToService(values, this.props.service.id))
    this.setState({
      editing: false
    });
    this.props.dispatch(fetchServices());
    }

  render() {

    const formattedDate = this.props.service.date;

    const time = this.props.service.time;

    return (
      <Service>
      {this.props.service &&
      <div>
        <DateTime role='banner'>
          {!this.state.editing && 
            <div>
            <div>
            {formattedDate}
            </div>
            <div>
            {time}
          </div>
        </div>}
        </DateTime>
        <Category>{!this.state.editing && this.props.service.category}</Category>
        {!this.state.editing && <EditButtonWrapper onClick={()=>this.toggleEditing()}><EditButton><FontAwesome name='edit'/></EditButton></EditButtonWrapper>}
        {this.state.editing &&
          <Form onSubmit={this.props.handleSubmit((values)=>(this.onSubmit(values)))}>
            <legend>Date and Time: </legend>
            <Field
              name ='date'
              component = {DatePicker}
            />
            <legend>Time:</legend>
            <Field 
              name='time'
              component={TimePicker}
        />
            <legend>Edit category</legend>
            <Field
              name='category'
              component = {TextField}
              type='text'
              validate={[minLength2]}
              defaultValue={this.state.category}
              />
            <ButtonWrapper>
            <SubmitButton type='submit'><SubmitButtonWrapper><FontAwesome name='check-circle'/></SubmitButtonWrapper></SubmitButton>
            <CancelButton onClick={()=>this.toggleEditing()} type='button'><CancelButtonWrapper><FontAwesome name='times'/></CancelButtonWrapper></CancelButton>
            </ButtonWrapper>
          </Form>}
      </div>
    }
    </Service>
    )
  }
}


export default ServiceInfo = reduxForm({
  form:'serviceInfo'
})(ServiceInfo);
