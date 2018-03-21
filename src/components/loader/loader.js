import React from 'react';
import {PropagateLoader} from 'react-spinners';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  margin-left: 48vw;
  margin-top: 30vh;
`;

const Subtitle = styled.p`
  margin-left: -29px;
`;

export default function Loader(props) {
  return (
    <LoaderContainer>
      <Subtitle>Just a sec!</Subtitle>
      <PropagateLoader
      color= {'black'}
      loading= {props.loading}
      />
    </LoaderContainer>
  )
}
