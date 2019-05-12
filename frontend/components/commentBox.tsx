import React, {Component} from "react"
import styled from "styled-components"
import Comment from "./comment"
import {apiServer} from "../env"
import axios from 'axios'

const MainContainer = styled.div`
  text-align: left;
`

const TopContainer = styled.div`

`

const CommentPostContainer = styled.div`

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
      const comments: any = await axios.get(apiServer + `/${this.props.id}/comments`)

      let count = comments.length
      for (let i = 0; i < comments.length; i++) {
        count += comments[i].subcomments.length
      }
      this.setState({
        count: count,
        comments: comments
      })
    } catch (e) {
      alert('예기치 않은 오류가 발생 했습니다.')
    }
  }
  
  postComment = async () => {
    try {
      const post = await axios.post(apiServer + `/post/${this.props.id}/comments`, {
        content: this.state.content,
        writer: this.state.writer,
        password: this.state.password,
        email: this.state.email
      })
      alert('성공적으로 댓글이 등록 되었습니다.')
      this.setState({
        content: '',
        writer: '',
        password: '',
        email: '',
      })
      this.getComments()
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
    const comments = this.props.comments.map((comment: any, i: number) => {
      const subcomments = comment.subcomments.map((subcomment: any, j: number) => {
        return (<div>What</div>)
      })
      return (
        <Comment key={i} comment={comment} reset={this.getComments} />
      )
    })

    return (
      <MainContainer>
        <TopContainer>
          {this.state.count}개 댓글
        </TopContainer>
        <CommentPostContainer>
          <input value={this.state.writer} onChange={this.handleChange} name="writer" placeholder="작성자" />
          <input type="email" value={this.state.email} onChange={this.handleChange} name="email" placeholder="이메일" />
          <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="비밀 번호" />
          <textarea placeholder="댓글을 입력 해 주세요" value={this.state.content} onChange={this.handleChange} name="content" />
          <input type="button" onClick={this.postComment}/>
        </CommentPostContainer>
        {comments}
      </MainContainer>
    ) 
  }
}

export default Comments