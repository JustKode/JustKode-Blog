import React, {Component, Fragment} from "react"
import styled from "styled-components"
import Comment from "./comment"
import SubComment from "./subcomment"
import {apiServer, staticServer} from "../env"
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'
import axios from 'axios'

const MainContainer = styled.div`
  text-align: left;
`

const TopContainer = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding: 4px;
`

const CommentPostContainer = styled.div`
  input {
    padding: 4px 8px;
    width: 308px;
    box-sizing: border-box;
    margin: 4px;
  }

  textarea {
    width: 1000px;
    padding: 4px 8px;
    line-height: 3;
    display: block;
    box-sizing: border-box;
    margin: 4px;
  }

  input[type=button] {
    width: 100px;
    border: none;
    background-color: #00091a;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    cursor: pointer;
  }

  @media (max-width: ${tabletMaxRowSize}) {
    input {
      display: block;
    }

    textarea {
      width: 90%;
      min-width: 308px;
    }
  }
`

interface CommentProps {
  id: string,
  comments: Array<object>,
  count: number
}

class Comments extends Component<CommentProps, any> {
  constructor(props: CommentProps) {
    super(props)
    this.state = {
      count: this.props.count,
      comments: this.props.comments,
      content: '',
      writer: '',
      password: '',
      email: '',
    }
  }

  getComments = async () => {
    try {
      const comments: any = await axios.get(staticServer + `/post/${this.props.id}/comments/`)
    
      let count = comments.data.length
      for (let i = 0; i < comments.data.length; i++) {
        count += comments.data[i].subcomments.length
      }
      this.setState({
        count: count,
        comments: comments.data
      })
    } catch (e) {
      alert('예기치 않은 오류가 발생 했습니다.')
    }
  }
  
  postComment = async () => {
    try {
      const post = await axios.post(staticServer + `/post/${this.props.id}/comments`, {
        content: this.state.content,
        writer: this.state.writer,
        password: this.state.password,
        email: this.state.email
      })
      this.setState({
        content: '',
        writer: '',
        password: '',
        email: '',
      })
      await this.getComments()
      alert('성공적으로 댓글이 등록 되었습니다.')
    } catch (e) {
      if (e.status == 400) {alert('모든 정보를 입력 해 주세요')} 
    }
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    const comments = this.state.comments.map((comment: any, i: number) => {
      const subcomments = comment.subcomments.map((subcomment: any, j: number) => {
        return (<SubComment key={j} comment={subcomment} reset={this.getComments} />)
      })
      return (
        <Fragment key={i}>
          <Comment key={i} comment={comment} reset={this.getComments} />
          {subcomments}
        </Fragment>
      )
    })

    return (
      <MainContainer>
        <TopContainer>
          {this.state.count}개 댓글
        </TopContainer>
        <CommentPostContainer>
          <input type="text" value={this.state.writer} onChange={this.handleChange} name="writer" placeholder="작성자" />
          <input type="email" value={this.state.email} onChange={this.handleChange} name="email" placeholder="이메일" />
          <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="비밀 번호" />
          <textarea placeholder="댓글을 입력 해 주세요" value={this.state.content} onChange={this.handleChange} name="content" />
          <input type="button" onClick={this.postComment} value="작성" />
        </CommentPostContainer>
        {comments}
      </MainContainer>
    ) 
  }
}

export default Comments