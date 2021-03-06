import React, {Component} from "react"
import Head from 'next/head'
import Error from 'next/error'
import Layout from "../../components/layout"
import Banner from "../../components/banner"
import Preview from "../../components/preview"
import Comments from "../../components/commentBox"
import styled from "styled-components"
import axios from 'axios'
import {apiServer} from '../../env'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../../styles/layout'
const route = require('../../routes')
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
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
`

const PostInfo = styled.div`
  padding: 1rem;
  text-align: left;

  &>span {
    color: gray;
    margin-right: 1rem;
    font-size: 0.7rem;
  }
  &>span>span{
    margin-left: 4px;
  }
`

const Content = styled.div`
  text-align: left;
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: normal;

  border-top: 0.3px solid #bbbbbb;
`

class Post extends Component<any, any> {
  static async getInitialProps({ query }: any) {
    try {
      const post = await axios.get(apiServer + `/post/${query.postId}/`)
      return {
        id: query.postId,
        post: post.data.post,
        comments: post.data.comments,
      }
    } catch (err) {
      return {error: err.response.status}
    }
  }

  render() {
    if (this.props.error) {
      return (<Error statusCode={this.props.error} />)
    }

    return (
      <Layout>
        <Head>
          <title>{this.props.post.title}</title>
          <meta name="description" content={this.props.post.summary}></meta>
          <meta property="og:image" content={this.props.post.image}></meta>
          <meta property="og:description" content={this.props.post.summary}></meta>
          <meta property="og:title" content={this.props.post.title}></meta>
        </Head>
        <MainContainer>
          <SubContainer>
            <PostInfo>
              <Title>{this.props.post.title}</Title>
              <span>
                <i className="far fa-folder-open"></i>
                <Link href={`/board/${this.props.post.category_url}`}><span style={{cursor: 'pointer'}}>{this.props.post.category_name}</span></Link>
              </span>
              <span>
                <i className="far fa-clock"></i>
                <span>{this.props.post.writedAt}</span>
              </span>
              <span>
                <i className="fas fa-comments"></i>
                <span>{this.props.post.comment_count}</span>
              </span>
            </PostInfo>
            <Content dangerouslySetInnerHTML={ {__html: this.props.post.content} }></Content>
            <Comments id={this.props.id} comments={this.props.comments} count={this.props.post.comment_count} />
          </SubContainer>
        </MainContainer>
      </Layout>
    )
  }
}

export default Post