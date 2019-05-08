import React, {Component} from "react"
import styled from "styled-components"
import axios from "axios"
import {apiServer} from "../env"
import { resetWarningCache } from "prop-types";

const CommentContainer = styled.div`

`

const CommentTop = styled.div`

`

const CommentContents = styled.div`

`

interface CommentObject {
    id: number,
    post: number,
    writer: string,
    email: string,
    content: string,
    writedAt: string
}

interface CommentProps {
    comment: CommentObject,
    reset(): void
}

class Comment extends Component<CommentProps, any> {
    state = {
        comment: {
            id: 0,
            post: 0,
            writer: '',
            email: '',
            content: '',
            writedAt: ''
        },
        password: '',
        changing: false,
        removing: false 
    }
    
    constructor(props: CommentProps) {
        super(props)
        this.setState({
            comment: this.props.comment
        })
    }

    static getDerivedStateFromProps(nextProps: CommentProps, prevState: any) {
        if (nextProps.comment !== prevState.comment){
            return {
                comment: nextProps.comment,
                password: '',
                changing: false,
                removing: false
            }
        }
        return null
    }

    modify = async () => {
        try {
            const res = await axios.put(apiServer + `/comment/${this.props.comment.id}/`, {
                password: this.state.password,
                content: this.state.comment.content
            })
            alert("성공적으로 변경 되었습니다.")
            this.props.reset()
        } catch(e) {
            if (e.status == 400) alert("비밀번호가 일치하지 않습니다.")
            else if (e.status == 404) {
                alert("댓글이 존재하지 않습니다.")
                this.props.reset()
            }
        }
    }

    modifyButton = () => {
        this.setState({
            changing: !this.state.changing
        })
    }

    remove = async () => {
        try {
            const res = await axios.delete(apiServer + `/comment/${this.props.comment.id}/`, {
                data: {password: this.state.password}
            })
            alert("성공적으로 변경 되었습니다.")
            this.props.reset()
        } catch(e) {
            if (e.status == 400) alert("비밀번호가 일치하지 않습니다.")
            else if (e.status == 404) {
                alert("댓글이 존재하지 않습니다.")
                this.props.reset()
            }
        }
    }

    removeButton = () => {
        this.setState({
            changing: !this.state.changing
        })
    }

    render() {
        return (
            <CommentContainer>
                <CommentTop>{this.state.comment.writer}</CommentTop>
                <CommentContainer>{this.state.comment.content}</CommentContainer>
            </CommentContainer>
        )
    }
}

export default Comment