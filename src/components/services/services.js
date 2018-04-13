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

const Tdate = styled.td`
  width: 300px;
  ${media.handheld`
    display: block;
    width: unset;
  `}
`;

const Table = styled.table`
  margin-right: auto;
  margin-left: auto;
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
    height: 100px;
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
  ${media.handheld`
    margin-left: unset;
  `}
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
  ${media.handheld`
    position: unset;
    width: unset;
  `}
`;

const Page = styled.div`
`;

const ListSection = styled.section`

${media.handheld`
  margin-left: 0px;
  `}
`;

const Title = styled.p`
  text-align: center;
  font-size: 90px;
  margin-top: 0px;
  margin-bottom: 0px;
  ${media.handheld`
    font-size: 70px;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
    margin-left: unset;
    `}
`;

const Time =styled.h5`
  margin-top: 7px;
  text-indent: 28px;
  ${media.handheld`
    margin-bottom: 0px;
    text-indent: 0px;
  `}
`;

const ButtonWrapper = styled.div`
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
        <Tdate>
          <Date>{service.date}</Date><br />
          <Time>{service.time}</Time>
        </Tdate>
        <Td>
          <Category>{service.category}</Category>
        </Td>
        <Td>
        <ButtonWrapper>
          <Link to = {`/services/${service.id}`}>
            <Details id={service.id}>Details</Details>
          </Link>
          <Delete id={service.id} onClick={
            (e)=> this.onDelete(e.target.id)}>Delete</Delete>
          </ButtonWrapper>
        </Td>
        </Tr>
      ))

    return (
      <Page>
        <Title role='banner'>Services</Title>
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
