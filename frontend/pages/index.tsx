import * as React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"
import styled from "styled-components"
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const HelloContainer = styled.div`
  text-align: center;
`

const HelloSubContainer = styled.div`
  display: inline-block;
  width: ${tabletMaxRowSize};

  @media (max-width: ${tabletMaxRowSize}) {
    width: 100%;
  }
  margin: 20px 0;
`

const HelloTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: ${sidePaddingSize};
`

const HelloContent = styled.div`
  margin: auto;
  padding: 10px;
  max-width: 720px;
  width: 100%;
`

const StackContainer = styled.div`
  vertical-align: top;
  display: inline-block;
  max-width: 240px;
  width: 33%;
  border: 0.3px solid #dddddd;
`

const StackTitle = styled.div`
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 0.3px solid #dddddd;
  padding: 8px 0;
`

const StackContent = styled.div`
  border-bottom: 0.3px solid #dddddd;
  img {
    width: 80%;
    padding: 10%;
    display: inline-block;
    border-bottom: 0.3px solid #dddddd;
  }
  div.name {
    font-weight: bold;
  }
`

export default () => {
  return (
    <Layout>
        <Banner></Banner>
        <HelloContainer>
          <HelloSubContainer>
            <HelloTitle>Hello! I'm JustKode</HelloTitle>
            <HelloContent>안녕하세요! 현재 경희대학교 컴퓨터공학부 3학년 휴학 중인 JustKode, 박민재라고 합니다.</HelloContent>
            <HelloContent>2017.03.01~ 경희대학교 컴퓨터공학과 재학</HelloContent>
            <HelloContent>2019.06.02~2020.12.29 육군 복무</HelloContent>
          </HelloSubContainer>
          <HelloSubContainer>
            <HelloTitle>Stack</HelloTitle>
            <StackContainer>
              <StackTitle>Frontend</StackTitle>
              <StackContent>
                <img src="/static/react-logo.png" />
                <div className="name">React</div>
                <div className="percent">30%</div>
              </StackContent>
              <StackContent>
                <img src="/static/vue-logo.png" />
                <div className="name">Vue.js</div>
                <div className="percent">20%</div>
              </StackContent>
            </StackContainer>
            <StackContainer>
              <StackTitle>Backend</StackTitle>
              <StackContent>
                <img src="/static/django-logo.jpg" />
                <div className="name">Django</div>
                <div className="percent">50%</div>
              </StackContent>
              <StackContent>
                <img src="/static/nodejs-logo.png" />
                <div className="name">Node.js</div>
                <div className="percent">50%</div>
              </StackContent>
              <StackContent>
                <img src="/static/flask-logo.jpg" />
                <div className="name">Flask</div>
                <div className="percent">30%</div>
              </StackContent>
            </StackContainer>
            <StackContainer>
              <StackTitle>Data</StackTitle>
              <StackContent>
                <img src="/static/pytorch-logo.png" />
                <div className="name">PyTorch(DL)</div>
                <div className="percent">20%</div>
              </StackContent>
            </StackContainer>
          </HelloSubContainer>
        </HelloContainer>
    </Layout>
  )
}
