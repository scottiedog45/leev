import React from 'react';
import styled from 'styled-components';
import clipboard from './clipbaord.png';
import money from './notes.png';

const Panellist = styled.ul`
  list-style: none;
  padding-left: 0px;
  overflow: hidden;
  margin-top: 0px;
  height: 100%;
  margin-bottom: 0px;
`;

const DemoButton = styled.button`
display: block;
margin-left: auto;
margin-right: auto;
font-size: 15px;
width: 127px;
height: 31px;
border: none;
border-radius: 5px;
background-color: #eb5e28;
color: white;
margin-top: 20px;
`;


//html showing under last li

const Title = styled.h1`
  margin: 0px;
  font-size: 75px;
  padding-top: 152px;
`;

const Panel = styled.li`

`;

const Panel1 = Panel.extend`
  background-color: #fff0c5;
  text-align: center;
  height: 500px;
`;

const Panel2 = Panel.extend`
  background-color: none;
  height: 400px;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-around;
`;

const PanelInstructions = Panel.extend`

`;

const Panel3 = Panel.extend`
  background-color: #E5E5E5;
  height: 400px;
  text-align: center;
`;

const Panel4 = Panel.extend`
  background-color: none;
  height: 400px;
`;

const Panel5 = Panel.extend`
  background-color: #E5E5E5;
  height: 100px;
`;

const SignUpTitle = styled.p`
  display: block;
  text-align: center;
  margin-top: 0px;
  padding-top: 100px;
  font-size: 30px;
`;

const SignUpButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 15px;
  width: 127px;
  height: 31px;
  border: none;
  border-radius: 5px;
  background-color: #eb5e28;
  color: white;
  margin-top: 92px;
`;

const Signature = styled.p`
  margin-top: 0px;
  display: block;
  text-align: center;
  padding-top: 40px;
`;

const MoneyIcon = styled.img`
  height: 250px;
`;

const ClipboardIcon = styled.img`
  height: 256px;
`;


const IconContainer = styled.div`
  text-align: center;
`;

const IconLabel = styled.p`
  width: 250px;
  word-wrap: break-word;
  font-size: 18px;
`;

const Quote = styled.h3`
  margin-top: 0px;
  padding-top: 130px;
`;

const Subtitle = styled.h3`
  margin-top: 4px;
`;


export default function Home(props) {
  return (
    <div className="home-page">
      <Panellist>
        <Panel1>
          <Title>Welcome to Leev.</Title>
          <Subtitle>Leev provides a stupendous solution for tracking your group's leave.</Subtitle>
          <DemoButton>DEMO</DemoButton>
        </Panel1>
        <Panel2>
        <IconContainer>
          <IconLabel>Leev takes the hassle out of recording leave data for your group.</IconLabel>
            <ClipboardIcon src={clipboard} alt={'clipboard'} />
          </IconContainer>
          <IconContainer>
            <IconLabel>With better tools, you have more time to focus on your work.</IconLabel>
            <MoneyIcon src={money} alt={'money'} />
            </IconContainer>
        </Panel2>
        <PanelInstructions>

        </PanelInstructions>
        <Panel3>
        <Quote>"Do not strive to make your presence noticed, just your absence felt"</Quote>
        <h5>-From someone important</h5>

        </Panel3>
        <Panel4>
          <SignUpTitle>Sign up today to use Leev for your team.</SignUpTitle>
            <SignUpButton>Sign Up</SignUpButton>

        </Panel4>
        <Panel5>
          <Signature>&#x24B8; Scott O'Toole</Signature>
        </Panel5>
      </Panellist>
    </div>
  );
}
