import React, {Component} from "react"
import styled from "styled-components"
import comment from "./comment"


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

  render() {
    return (
        <div>
            헤헤
        </div>
    ) 
  }
}

export default Comments