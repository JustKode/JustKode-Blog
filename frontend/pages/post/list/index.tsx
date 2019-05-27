import React, {Component, Fragment} from "react"
import Error from 'next/error'
import Head from 'next/head'
import Layout from "../../../components/layout"
import Preview from "../../../components/preview"
import styled from "styled-components"
import axios from 'axios'
import {apiServer} from '../../../env'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../../../styles/layout'
const route = require('../../../routes')
const {Link, Route} = route

const MainContainer = styled.div`
  text-align: center;
`

const SubContainer = styled.div`
  display: inline-block;
  width: 100%;
  max-width: ${tabletMaxRowSize};
  margin: 20px 0;
`

const Title = styled.div`
  span {
    font-size: 2rem;
    border-bottom: 0.4rem solid black;
    font-weight: bold;
  }
  
  margin: 1rem;
`

const MorePost = styled.div`
  span {
    font-size: 1.3rem;
    font-weight: bold;
    color: black;
    cursor: pointer;
    padding: 0 20px;
  }
`

class IndexAll extends Component<any, any> {
  static async getInitialProps({ query }: any) {
    try {
      const posts = await axios.get(apiServer + `/board/all/${query.page || 1}`)
      return {
        posts: posts.data,
        page: Number(query.page || 1)
      }
    } catch (e) {
      return {
        error: e.response.status
      }
    }
  }

  render() {
    if (this.props.error) {
      return (<Error statusCode={this.props.error} />)
    }

    let postlist

    if (this.props.posts.length === 0 || this.props.page === 0) {
      postlist = (<div>포스트가 존재하지 않습니다.</div>)
    } else {
      postlist = this.props.posts.map((post: any, i: number) => {
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
    }

    return (
      <Layout>
        <Head>
          <title>Recent Post : Page {this.props.page}</title>
          <meta name="description" content={`모든 글 ${this.props.page} 페이지`}></meta>
          <meta property="og:image" content="/static/banner-image.jpg"></meta>
          <meta property="og:description" content={`모든 글 ${this.props.page} 페이지`}></meta>
          <meta property="og:title" content={`Recent Post : Page ${this.props.page}`}></meta>
        </Head>
        <MainContainer>
          <SubContainer>
            <Title><span>Recent Post : Page {this.props.page}</span></Title>
            {postlist}
            <MorePost>
              {this.props.page > 1 && (
                <Link route="post/list" params={{page: this.props.page - 1}}>
                  <span><i className="fas fa-caret-left"></i> 이전</span>
                </Link>
                )}
              {(this.props.posts.length === 10 && this.props.page >= 1) && (
                <Link route="post/list" params={{page: this.props.page + 1}}>
                  <span>다음 <i className="fas fa-caret-right"></i></span>
                </Link>
              )}
            </MorePost>
          </SubContainer>
        </MainContainer>
      </Layout>
    )
  }
}

export default IndexAll