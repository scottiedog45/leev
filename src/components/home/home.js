import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {media} from '../style-utils'
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';

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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.h1`
  margin: 0px;
  font-size: 75px;
  padding-top: 152px;
  ${media.handheld`
    font-size: 38px;
    padding-top: 171px;
    `}
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
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-around;
  ${media.handheld`
    display: inherit;
    `}
`;

const Panel3 = Panel.extend`
  padding: 20px;
  background-color: #fff0c5;
  text-align: center;
  height: unset;

`;

const Panel4 = Panel.extend`
  background-color: none;
  height: 350px;
  text-align: center;
  padding: 20px;
`;

const Panel5 = Panel.extend`
  background-color: #fff0c5;
  height: 100px;
`;

const SignUpTitle = styled.p`
  display: block;
  text-align: center;
  margin-top: 0px;
  font-size: 30px;
  ${media.handheld`
    font-size: 27px;
    `}
`;

const Signature = styled.p`
  margin-top: 0px;
  display: block;
  text-align: center;
  padding-top: 40px;
`;

const IconContainer = styled.div`
  text-align: center;
`;

const IconLabel = styled.p`
  width: 250px;
  word-wrap: break-word;
  font-size: 18px;
  ${media.handheld`
    margin: 10px;
    text-align: center;
    width: unset;
    `}
`;

const Quote = styled.h4`
  margin-top: 0px;
  padding-top: 18px;
  margin-bottom: 9px;
  ${media.handheld`

    `}
`;

const Subtitle = styled.h3`
  margin-top: 4px;
  ${media.handheld`
    padding: 5px;
    `}
`;

const Best = styled.h2`
  padding-top: 100px;
  margin: 0px;
  margin-bottom: 10px;
`;

const IconWrapper=styled.div`
  font-size: 170px;
  ${media.handheld`
    font-size: 100px;
    `}
`;

function Home(props) {
  return (
    <div className="home-page">
      <Panellist>
        <Panel1>
          <Title role='banner'>Welcome to Leev.</Title>
          <Subtitle>Leev provides a stupendous solution for tracking your group's leave.</Subtitle>
          <StyledLink to={'/signup'}>
            <DemoButton>Sign Up</DemoButton>
          </StyledLink>
        </Panel1>
        <Panel2>
        <IconContainer>
          <IconLabel>Leev takes the hassle out of recording leave data for your group.</IconLabel>
          <IconWrapper>
            <FontAwesome name='chart-bar'/>
          </IconWrapper>
          </IconContainer>
          <IconContainer>
            <IconLabel>An ituitive interface means no learning curve for you and your team.</IconLabel>
            <IconWrapper>
            <FontAwesome name='check-circle'/>
            </IconWrapper>
          </IconContainer>
          <IconContainer>
            <IconLabel>With better tools, you have more time to focus on your work.</IconLabel>
            <IconWrapper>
            <FontAwesome name='dollar-sign'/>
            </IconWrapper>
            </IconContainer>
        </Panel2>
        <Panel3>
        <h2>Literally everyone is talking about Leev.</h2>
          <Quote>"Do not strive to make your presence noticed, just your absence felt."</Quote>
          <h5>-Anonymous</h5>
          <Quote>"I was president for 8 years, all thanks to Leev."</Quote>
          <h5>-Barack Obama</h5>
        </Panel3>
        <Panel4>
        <Best>Best of all, it's absolutely free.</Best>
          <SignUpTitle>Sign up today to use Leev for your team.</SignUpTitle>
          <StyledLink to={'/signup'}>
            <DemoButton>Sign Up</DemoButton>
          </StyledLink>
        </Panel4>
        <Panel5>
          <Signature>&#x24B8; Scott O'Toole</Signature>
        </Panel5>
      </Panellist>
    </div>
  );
}

const mapStateToProps = state => ({
  loading: state.leev.loading
});

export default connect(mapStateToProps)(Home);
