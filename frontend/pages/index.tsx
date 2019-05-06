import * as React from "react"
import Head from 'next/head'
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
  width: 100%;
  max-width: ${tabletMaxRowSize};
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

const LinkContainer = styled.div`
  height: 300px;
  display: block;

  @media (max-width: ${phoneMaxRowSize}) {
    height: 200px;

    i {
      display: inline-block;
      font-size: 3rem;
      padding: 50px 0;
      margin: 1rem;
      color: white;
    }
  }

  i {
    display: inline-block;
    font-size: 5rem;
    padding: 70px 0;
    margin: 1rem;
    color: white;
  }
`


export default () => {
  return (
    <Layout>
      <Head>
        <title>Hello! JustKode!</title>
      </Head>
        <Banner></Banner>
        <HelloContainer>
          <HelloSubContainer>
            <HelloTitle><span>Hello! I'm JustKode</span></HelloTitle>
            <HelloContent>안녕하세요! 현재 경희대학교 컴퓨터공학과 3학년 휴학 중인 JustKode, 박민재라고 합니다.</HelloContent>
            <HelloContent>2017.03.01~ 경희대학교 컴퓨터공학과 재학</HelloContent>
            <HelloContent>2019.06.02~2020.12.29 육군 복무</HelloContent>
            <HelloContent style={{fontWeight: 'bold', padding: '1.2rem', fontSize: '1.2rem'}}>Just, Kode it.</HelloContent>
          </HelloSubContainer>
        </HelloContainer>
        <HelloContainer style={{backgroundColor: '#eeeeee'}}>
          <HelloSubContainer>
            <HelloTitle><span>Recent Posts</span></HelloTitle>
            <Preview
              img="/static/banner-image.jpg"
              title="string"
              commentCount={1}
              content="string"
              category="string"
              postId={1}
              categoryLink="github.com"
              writedAt="2019-05-01"
            ></Preview>
            <Preview
              img="/static/banner-image.jpg"
              title="string"
              commentCount={3}
              content="나는 빡빡이다 나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다나는 빡빡이다"
              category="string"
              postId={1}
              categoryLink="github.com"
              writedAt="2019-05-01"
            ></Preview>
          </HelloSubContainer>
        </HelloContainer>
        <HelloContainer style={{backgroundColor: '#444444', color: 'white'}}>
          <HelloSubContainer>
            <HelloTitle><span style={{borderBottom: '0.4rem solid white'}}>Link</span></HelloTitle>
            <LinkContainer>
              <a href=""><i className="fas fa-user-alt"></i></a>
              <a href=""><i className="fab fa-github"></i></a>
              <a href=""><i className="fab fa-instagram"></i></a>
              <a href=""><i className="fab fa-facebook-square"></i></a>
            </LinkContainer>
          </HelloSubContainer>
        </HelloContainer>
    </Layout>
  )
}
