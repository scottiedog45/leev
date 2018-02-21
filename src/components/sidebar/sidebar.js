import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './sidebar.css'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome';

export function Sidebar(props) {

  const Button = styled.button`
    width: 200px;
    display: inline-block;
    margin-top: 10px;
    margin-bottm: 10px;
    height: 40px;
    background-color: #252422;;
    color: #eb5e28;
    font-size: 20px;
  `;

  const List = styled.ul`
    list-style: none;
    padding-left: 0px;
    margin:0px;
  `;

  const NavBar = styled.nav`
    background-color: #252422;
    overflow: hidden;
  `;

  const RightButton = styled.button`
    float: right;
    width: 200px;
    display: inline-block;

    height: 40px;
    background-color: #252422;;
    color: #eb5e28;
    font-size: 20px;
  `;

  const LeftButton = styled.button `
    float: left;
    width: 200px;
    display: inline-block;

    height: 40px;
    background-color: #252422;;
    color: #eb5e28;
    font-size: 20px;
  `;

  const StyledRightLinks = styled(Link)`
  text-decoration: none;
  float: right;
  font-size: 20px;
  color: #eb5e28;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 10px;
  &:hover {
    color: #eb5e2896;
  }
  `;

  const StyledLink = styled(Link)`
     text-decoration: none;
     float: left;
     font-size: 50px;
     color: #eb5e28;
     display: inline-block;
     margin-left: 15px;
     &:hover {
       color: #eb5e2896;
     }
  `;

  const CalendarWrapper = styled.span`
    margin-left: 15px;
  `;

  return (
      <NavBar>
        <List>
          <li>
            <StyledLink to ={`/`}>
            <CalendarWrapper><FontAwesome name='calendar' /></CalendarWrapper>
              Leev
            </StyledLink>
          </li>
          <li>
            <StyledRightLinks to = {`/services`}>
              Services
            </StyledRightLinks>
          </li>
          <li>
          <StyledRightLinks to ={`/members`}>
            Profiles
          </StyledRightLinks>
          </li>
        </List>
      </NavBar>
  )
}

const mapStateToProps = (state, props)  => ({
  optionList: state.leev.optionList
});

export default connect(mapStateToProps)(Sidebar);
