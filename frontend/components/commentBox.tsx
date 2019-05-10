import React, {Component} from "react"
import styled from "styled-components"
import comment from "./comment"
import {apiServer} from "../env"
import Axios from "axios";


interface CommentProps {
  id: string,
  comments: Array<object>
}

class Comments extends Component<CommentProps, any> {
  constructor(props: CommentProps) {
    super(props)
    this.setState({
      comments: this.props.comments
    })
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
      return ({

      })
    })

    return (
        <div>
            헤헤
        </div>
    ) 
  }
}

export default Comments