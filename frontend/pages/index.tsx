import React, {Component} from "react"
import Head from 'next/head'
import axios from 'axios'
import Error from 'next/error'
import Layout from "../components/layout"
import Banner from "../components/banner"
import Preview from "../components/preview"
import {apiServer, staticServer} from '../env'
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


class Index extends Component<any, any> {
  static async getInitialProps({ query }: any) {
    try {
      const board = await axios.get(apiServer + '/board')
      const posts = await axios.get(apiServer + '/board/all')
      return {
        board: board.data,
        posts: posts.data
      }
    } catch (e) {
      console.log(e)
      if (e.response) { 
        return {error: e.response.status}
      } else {
        return {error: 500}
      }
    }
  }

  render() {
    if (this.props.error) {
      return (<Error statusCode={this.props.error} />)
    }  

    // posts components
    const postlist = this.props.posts.map((post: any, i: number) => {
      return (
        <Preview 
          key={i}
          img={post.image}
          title={post.title}
          commentCount={post.comment_count}
          content={post.summary}
          category={post.category_name}
          writedAt={post.writedAt}
          postId={post.id}
          categoryLink={post.category_url}
        />
      )
    })

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
            {postlist}
          </HelloSubContainer>
        </HelloContainer>
        <HelloContainer style={{backgroundColor: '#444444', color: 'white'}}>
          <HelloSubContainer>
            <HelloTitle><span style={{borderBottom: '0.4rem solid white'}}>Link</span></HelloTitle>
            <LinkContainer>
              <a href="/info"><i className="fas fa-user-alt"></i></a>
              <a href="https://github.com/JustKode"><i className="fab fa-github"></i></a>
              <a href="https://www.instagram.com/0ccean/"><i className="fab fa-instagram"></i></a>
              <a href="https://www.facebook.com/profile.php?id=100014409812788"><i className="fab fa-facebook-square"></i></a>
            </LinkContainer>
          </HelloSubContainer>
        </HelloContainer>
    </Layout>
    )
  }
}

export default Index