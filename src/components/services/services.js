import React from 'react';
import {connect} from 'react-redux';
import {CreateServiceForm} from '../createServiceForm/createServiceForm';
import {deleteService, fetchServices} from '../../actions';
import {Link} from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import {media} from '../style-utils'

const Td = styled.td`
  width: 166px;
  ${media.handheld`
    display: block;
    width: unset;
    `}
`;

const Table = styled.table`
${media.handheld`
  display: block
  `}
`;

const Tr = styled.tr`
  height: 75px;
  ${media.handheld`
    display: block;
    text-align: center;
    margin-top: 30px;
    `}
`;

const Tb = styled.tbody`
${media.handheld`
  display: block
  `}
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
  ${media.handheld`
    position: unset;
    width: unset;
    `}
`;

const Page = styled.div`
`;

const ListSection = styled.section`
margin-left: 200px;
${media.handheld`
  margin-left: 0px;
  `}
`;

const Title = styled.p`
  font-size: 90px;
  margin-top: 0px;
  margin-left: 20px;
  margin-bottom: 0px;
  ${media.handheld`
    font-size: 70px;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
    margin-left: unset;
    `}
`;

class Services extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchServices());
  }

  onDelete(id) {
    window.confirm('do you want to delete this service?');
    this.props.dispatch(deleteService(id));
  }

    render() {

      const services = this.props.services.map((service, index) => (
        <Tr key={index}>
        <Td>
          <Date>{moment(service.dateTime).format("dddd, MMMM Do YYYY, h:mm a")}</Date>
        </Td>
        <Td>
          <Category>{service.category}</Category>
        </Td>
        <Td>
          <Link to = {`/services/${service.id}`}>
            <Details id={service.id}>Details</Details>
          </Link>
          <Delete id={service.id} onClick={
            (e)=> this.onDelete(e.target.id)}>Delete</Delete>
        </Td>
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
            <Table>
              <Tb>
                {services}
              </Tb>
            </Table>
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
