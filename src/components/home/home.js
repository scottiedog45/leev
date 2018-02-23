import React from 'react';
import styled from 'styled-components';

const Panellist = styled.ul`
  list-style: none;
  padding-left: 0px;
  overflow: hidden;
  margin-top: 0px;
  height: 100%;
  margin-bottom: 0px;
`;

//html showing under last li

const Title = styled.h1`
  margin: 0px;
  font-size: 75px;
  padding-top: 152px;
`;

const Panel = styled.li`
  height: 500px;
`;

const Panel1 = Panel.extend`
  background-color: #E5E5E5;
  text-align: center;
`;

const Panel2 = Panel.extend`
  background-color: #CCCCCC;
`;

const Panel3 = Panel.extend`
  background-color: #B3B3B3;
`;

const Panel4 = Panel.extend`
  background-color: #999999;
`;

const Panel5 = Panel.extend`
  background-color: #7F7F7F;
`;

export default function Home(props) {
  return (
    <div className="home-page">
      <Panellist>
        <Panel1>
          <Title>Welcome to Leev.</Title>
          <h3>Leev provides a stupendous solution for tracking your group's leave.</h3>
          <button>DEMO</button>
        </Panel1>
        <Panel2>
          Leev takes the hassle out of recording leave data for your group. 
        </Panel2>
        <Panel3>
          QUICKLY CREATE: Create services and edit service details
        </Panel3>
        <Panel4>
          EFFICIENTLY RECORD: the attendance roster for each service
        </Panel4>
        <Panel5>
          See all leave for a given member in their Member Details
        </Panel5>
      </Panellist>
    </div>
  );
}
