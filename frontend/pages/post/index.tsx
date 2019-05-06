import React, {Component} from "react"
import Head from 'next/head'
import Error from 'next/error'
import Layout from "../../components/layout"
import Banner from "../../components/banner"
import Preview from "../../components/preview"
import styled from "styled-components"
import axios from 'axios'
import {apiServer} from '../../env'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../../styles/layout'
import routes from '../../routes'
const {Link, Route} = routes

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

const SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  text-align: left;
  border-bottom: 0.2rem solid black;
  padding: 1rem;
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

const CommentBox = styled.div`
  text-align: left;
`

const Comment = styled.div`
  border-bottom: 0.3px solid #bbbbbb;
`

const SubComment = styled.div`
  margin-left: 2rem;
  border-bottom: 0.3px solid #bbbbbb;
`

const CommentBar = styled.div`
  margin: 1rem;
`

const CommentContents = styled.div`
  margin: 1rem;
`


class Post extends Component<any, any> {
  static async getInitialProps({ query }: any) {
    try {
      const post = await axios.get(apiServer + `/post/${query.postId}`)
      return {
        post: post.data.post,
        comments: post.data.comments
      }
    } catch (err) {
      return {error: err.response.status}
    }
  }

  render() {
    console.log(this.props.post)
    if (this.props.error) {
      return (<Error statusCode={this.props.error} />)
    }

    const comments = this.props.comments.map((comment: any, c_id: number) => {
      const subcomments = comment.subcomments.map((subcomment: any, sc_id: number) => {
        return (
          <SubComment key={sc_id}>
            <CommentBar>
              {subcomment.writer}
            </CommentBar>
            <CommentContents>
              {subcomment.content}
            </CommentContents>
          </SubComment>
        )
      })
      return (
        <div>
          <Comment key={c_id}>
            <CommentBar>
              {comment.writer}
            </CommentBar>
            <CommentContents>
              {comment.content}
            </CommentContents>
          </Comment>
          {subcomments}
        </div>
      )
    })

    return (
      <Layout>
        <MainContainer>
          <SubContainer>
            <PostInfo>
              <Title>{this.props.post.title}</Title>
              <span>
                <i className="far fa-folder-open"></i>
                <Link href={this.props.post.category_url}><span style={{cursor: 'pointer'}}>{this.props.post.category_name}</span></Link>
              </span>
              <span>
                <i className="far fa-clock"></i>
                <span>{this.props.post.writedAt}</span>
              </span>    
              <span>
                <i class="fas fa-comments"></i>
                <span>{this.props.post.comment_count}</span>
              </span>
            </PostInfo>
            <Content dangerouslySetInnerHTML={ {__html: this.props.post.content} }></Content>
            <CommentBox>
              <SubTitle>{this.props.post.comment_count}개 댓글</SubTitle>
              {comments}
            </CommentBox>
          </SubContainer>
        </MainContainer>
      </Layout>
    )
  }
}

export default Post