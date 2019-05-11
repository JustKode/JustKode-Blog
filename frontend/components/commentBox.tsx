import React, {Component} from "react"
import styled from "styled-components"
import Comment from "./comment"
import {apiServer} from "../env"
import Axios from "axios";

const MainContainer = styled.div`
  text-align: left;
`

interface CommentProps {
  id: string,
  comments: Array<object>
}

class Comments extends Component<CommentProps, any> {
  constructor(props: CommentProps) {
    super(props)
    this.state = {
      comments: this.props.comments
    }
  }

  getComments = async () => {
    try {
      const comments = await Axios.get(apiServer + '/comment/' + this.props.id)
      this.setState({
        comments: comments
      })
    } catch (e) {
      alert('예기치 않은 오류가 발생 했습니다.')
    }
  }

  render() {
    const comments = this.props.comments.map((comment: any, i: number) => {
      const subcomments = comment.subcomments.map((subcomment: any, i: number) => {
        return (<div>What</div>)
      })
      return (
        <Comment comment={comment} reset={this.getComments} />
      )
    })

    return (
        <MainContainer>
            {comments}
        </MainContainer>
    ) 
  }
}

export default Comments