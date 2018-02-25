import React from 'react';
import {connect} from 'react-redux';
import {CreateServiceForm} from '../createServiceForm/createServiceForm';
import {deleteService} from '../../actions';
import {Link} from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

const Service = styled.li`
  margin-top: 35px;
  &:first-child{
    margin-top: 0px;
  }
`;

const Td = styled.td`
  width: 166px;
`;


const Tr = styled.tr`
  height: 75px;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding-left: 0px;
  margin-top: 0px;
`;

const Date = styled.h3`
  margin-bottom: 0px;
  display: inline;
  &:first-child {
    margin-top: 0px;
  }
`;

const Category = styled.h4`
  display: inline;
  margin-left: 20px;
  margin-top: 9px;
  margin-bottom: 9px;
  font-size: 13px;
`;

const Details = styled.button`
  width: 70px;
  background-color: #CCC5B9;
  color: #403d39;
  border: none;
  height: 25px;
`;

const Delete =styled.button`
  width: 70px;
  background-color: #CCC5B9;
  color: #403d39;
  border: none;
  height: 25px;
  margin-left: 20px;
`;

const Form = styled.div`
  position: absolute;
  width: 400px;
`;

const Page = styled.div`
`;

const ListSection = styled.section`
margin-left: 200px;
`;

const Title = styled.p`
  font-size: 90px;
  margin-top: 0px;
  margin-left: 20px;
  margin-bottom: 0px;
`;

class Services extends React.Component {

  onDelete(id) {
    window.confirm('do you want to delete this service?');
    this.props.dispatch(deleteService(id));
  }

    render() {

      const services = this.props.services.map((service, index) => (
        <Tr key={index}>
        <td>
          <Date>{moment(service.dateTime).format("dddd, MMMM Do YYYY, h:mm a")}</Date>
        </td>
        <Td>
          <Category>{service.category}</Category>
        </Td>
        <td>
          <Link to = {`/services/${service.id}`}>
            <Details id={service.id}>Details</Details>
          </Link>
          <Delete id={service.id} onClick={
            (e)=> this.onDelete(e.target.id)}>Delete</Delete>
        </td>
        </Tr>
      ))

    return (
      <Page>
      <Title>Services</Title>
        <Form>
          <CreateServiceForm />
        </Form>
        <ListSection>
          <ServiceList>
          <table>
            {services}
          </table>
          </ServiceList>
        </ListSection>
      </Page>
    );
  }
}

Services.defaultProps = {
  dateTime: 'July 100th 1776'
}

const mapStateToProps = state => ({
  services: state.leev.services,
  members: state.leev.members
});

export default connect(mapStateToProps)(Services);
