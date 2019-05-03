import * as React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"
import Timer from "../components/timer"
import styled from "styled-components"
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const InfoContainer = styled.div`
    text-align: center;
    padding: 20px 0;
`

const InfoSubContainer = styled.div`
  display: inline-block;
  width: ${tabletMaxRowSize};

  @media (max-width: ${tabletMaxRowSize}) {
    width: 100%;
  }
  margin: 20px 0;
`

const InfoTitle = styled.div`
  span {
    font-size: 2rem;
    border-bottom: 0.4rem solid black;
    font-weight: bold;
  }
  
  margin: 1rem;
`

const InfoContent = styled.div`
  margin: auto;
  padding: 0.3rem;
  max-width: 720px;
  width: 100%;
`

const StackKind = styled.div`
  span {
    font-size: 1.2rem;
    border-bottom: 0.2rem solid black;
    font-weight: bold;
  }
  text-align: left;
  margin: 1rem;
`

const Stack = styled.div`
  overflow: auto;
  text-align: left;
  vertical-align: middle;
  margin: 10px;

  img {
    width: 48px;
    float: left;
    margin: 10px;
  }

  span {
    font-size: 0.7rem;
    color: #888888;
  }
`

const StackGauge = styled.div`
  width: calc(90% - 10px);
  background-color: gray;
  display: inline-block;
  border-radius: 10px;

  div {
    height: 20px;
  }
`

export default () => {
    return (
        <Layout>
            <Banner></Banner>
            <InfoContainer>
                <InfoSubContainer>
                    <InfoTitle><span>Hello World!</span></InfoTitle>
                    <InfoContent>
                        안녕하세요! 경희대학교 컴퓨터공학과 3학년 휴학 중인 박민재라고 합니다.<br />
                        주로, <strong>웹 Frontend/Backend 개발</strong>을 주로 하며,<br />
                        <strong>Data Science</strong> 분야로 가기 위해서 학부에서 공부하는 중입니다.<br/><br/>
                        주로 사용 하는 언어는, <strong>Python, JavaScript, C++</strong> 이며,<br/>
                        Frontend 에서는 <strong>React</strong>, Backend 에서는 <strong>Django, Node.js</strong>를 주로 사용합니다.<br/>
                    </InfoContent>
                </InfoSubContainer>
            </InfoContainer>
            <InfoContainer style={{backgroundColor: '#003300'}}>
              <InfoTitle><span style={{color: 'white', borderBottomColor: 'white'}}>Discharge Countdown</span></InfoTitle>
              <InfoContent style={{padding: '70px 0'}}>
                <Timer />
              </InfoContent>
            </InfoContainer>
            <InfoContainer style={{backgroundColor: '#dddddd'}}>
              <InfoTitle><span>Development Stack</span></InfoTitle>
              <InfoContent>
                <StackKind><span>Language</span></StackKind>
                <Stack>
                  <img src="/static/python-logo.png"></img>
                  <StackGauge>
                    <div style={{width: '50%', backgroundColor: 'powderblue'}}></div>
                  </StackGauge>
                  <span>50%</span>
                </Stack>
              </InfoContent>
            </InfoContainer>
        </Layout>
    )
  }
  