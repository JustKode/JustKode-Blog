import * as React from "react"
import Layout from "../components/layout"
import Banner from "../components/banner"
import Preview from "../components/preview"
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
  span {
    font-size: 2rem;
    border-bottom: 0.4rem solid black;
    font-weight: bold;
  }
  
  margin: 1rem;
`

const HelloContent = styled.div`
  margin: auto;
  padding: 0.3rem;
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

  &:after{
      content: '';
      position: absolute;
      width: 0; height: 0.15rem;
      display: block;
      margin-top: 5px;
      right: 15%;
      background: #bbbbbb;
      transition: width .2s ease;
      -webkit-transition: width .2s ease;
    }
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
            <HelloTitle><span>Hello! I'm JustKode</span></HelloTitle>
            <HelloContent>안녕하세요! 현재 경희대학교 컴퓨터공학부 3학년 휴학 중인 JustKode, 박민재라고 합니다.</HelloContent>
            <HelloContent>2017.03.01~ 경희대학교 컴퓨터공학과 재학</HelloContent>
            <HelloContent>2019.06.02~2020.12.29 육군 복무</HelloContent>
            <HelloContent style={{fontWeight: 'bold', padding: '1.2rem', fontSize: '1.2rem'}}>Just, Kode it.</HelloContent>
          </HelloSubContainer>
        </HelloContainer>
        <HelloContainer style={{backgroundColor: '#eeeeee'}}>
          <HelloSubContainer>
            <HelloTitle><span>Recent Posts</span></HelloTitle>
            <Preview></Preview>
          </HelloSubContainer>
        </HelloContainer>
    </Layout>
  )
}
