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
  margin: 10px;
  height: 50px;

  img {
    width: calc(10% - 10px);
    max-width: 40px;
    float: left;
    margin-right: 10px;
    max-height: 40px;
  }

  span {
    font-size: 0.7rem;
    color: #888888;
  }

  span.left {
    float: left;
  }

  span.right {
    float: right;
  }

  &>div {
    width: 90%;
    display: inline-block;
  }
`

const StackGauge = styled.div`
  width: 100%;
  background-color: #444444;
  border-radius: 10px;
  margin-top: 2px;
  div {
    height: 19px;
    border-radius: 10px;
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
              <InfoSubContainer>
                <InfoContent>
                    <h3>Percent Meaning?</h3>
                    10% ~ 30%: 학습 중, 코드를 읽을 수 있는 수준<br/>
                    30% ~ 50%: 프로젝트 진행이 가능 한 수준<br/>
                    50% ~ 70%: 누군가를 가르칠 수 있는 수준<br/>
                    70% ~ 100% : 남들이 못하는 걸 할 수 있는 수준<br/> 
                </InfoContent>
              </InfoSubContainer>
              <InfoContent>
                <StackKind><span>Language</span></StackKind>
                <Stack>
                  <img src="/static/python-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '65%', backgroundColor: '#376e9d'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Python</span>
                      <span className="right">65%</span>
                    </div>
                  </div>
                </Stack>
                <Stack>
                  <img src="/static/javascript-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '60%', backgroundColor: '#f0db4f'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">JavaScript</span>
                      <span className="right">60%</span>
                    </div>
                  </div>
                </Stack>
                <Stack>
                  <img src="/static/cplusplus-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '55%', backgroundColor: '#0075c0'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">C++</span>
                      <span className="right">55%</span>
                    </div>
                  </div>
                </Stack>
                <StackKind><span>Frontend</span></StackKind>
                <Stack>
                  <img src="/static/react-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '50%', backgroundColor: '#00d8ff'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">React</span>
                      <span className="right">50%</span>
                    </div>
                  </div>
                </Stack>
                <Stack>
                  <img src="/static/vue-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '30%', backgroundColor: '#41b883'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Vue.js</span>
                      <span className="right">30%</span>
                    </div>
                  </div>
                </Stack>
                <StackKind><span>Backend</span></StackKind>
                <Stack>
                  <img src="/static/django-logo.jpg"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '50%', backgroundColor: '#336645'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Django</span>
                      <span className="right">50%</span>
                    </div>
                  </div>
                </Stack>
                <Stack>
                  <img src="/static/nodejs-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '50%', backgroundColor: '#83cd29'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Node.js</span>
                      <span className="right">50%</span>
                    </div>
                  </div>
                </Stack>
                <Stack>
                  <img src="/static/flask-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '40%', backgroundColor: '#003960'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Flask</span>
                      <span className="right">40%</span>
                    </div>
                  </div>
                </Stack>
                <StackKind><span>Data Science</span></StackKind>
                <Stack>
                  <img src="/static/numpy-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '20%', backgroundColor: '#3657b4'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Numpy</span>
                      <span className="right">20%</span>
                    </div>
                  </div>
                </Stack>
                <Stack>
                  <img src="/static/pytorch-logo.png"></img>
                  <div>
                    <StackGauge>
                      <div style={{width: '10%', backgroundColor: '#ee4c2c'}}></div>
                    </StackGauge>
                    <div>
                      <span className="left">Pytorch</span>
                      <span className="right">10%</span>
                    </div>
                  </div>
                </Stack>
              </InfoContent>
            </InfoContainer>
        </Layout>
    )
  }
  