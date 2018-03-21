import React from 'react';
import moment from 'moment';
import {Field, reduxForm} from 'redux-form';
import {patchToService, fetchServices} from '../../actions'
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {media} from '../style-utils'

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
      dateTimeValue: '2018-06-01T08:30',
      category: this.props.service.category
    }
  }

  //moment(this.props.service.dateTime).format("yyyy-MM-ddThh:mm")

  handleInitialize() {
    const initData = {
      'category': this.props.service.category,
      'dateTime': moment(this.props.service.dateTime).format("YYYY-MM-DDThh:mm")
    };
       this.props.initialize(initData);
  }

  componentWillMount(){
    this.handleInitialize();
}

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    });
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
    this.props.dispatch(patchToService(values, this.props.service.id))
    this.setState({
      editing: false
    });
    this.props.dispatch(fetchServices());
    }

    renderField ({
     input,
     label,
     type,
     meta: { touched, error, warning }
     }) {
       return  (
         <div>
           <label>{label}</label>
           <div>
             <input {...input} placeholder={label} type={type} />
             {touched &&
               ((error && <span>{error}</span>) ||
                 (warning && <span>{warning}</span>))}
           </div>
         </div>
       )
     }

  render() {

    const formattedDate = moment(this.props.service.dateTime).format("dddd, MMMM Do YYYY, h:mm a")

    return (
      <Service>
      {this.props.service &&
      <div>
        <DateTime role='banner'>{!this.state.editing && formattedDate}</DateTime>
        <Category>{!this.state.editing && this.props.service.category}</Category>
        {!this.state.editing && <EditButtonWrapper onClick={()=>this.toggleEditing()}><EditButton><FontAwesome name='edit'/></EditButton></EditButtonWrapper>}
        {this.state.editing &&
          <Form onSubmit={this.props.handleSubmit((values)=>(this.onSubmit(values)))}>
            <legend>Date and Time: </legend>
            <Field
              name ='dateTime'
              component = {this.renderField}
              type='datetime-local'
              onChange={(e)=>this.handleDateChange(e)}
              value={moment(this.props.service.dateTime).local().format("YYYY-MM-DDThh:mm")}
              validate={[required]}
              warn={required}
            />
            <legend>Edit category</legend>
            <Field
              name='category'
              component = {this.renderField}
              type='text'
              onChange={(e)=>this.handleCategoryChange(e)}
              value={this.props.service.category}
              validate={[required, minLength2]}
              warn={required}
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
