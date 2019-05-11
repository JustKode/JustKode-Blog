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

const SubCommentContainer = styled.div`

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
    reset(): void,
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
        subcomment: '',
        subwriter: '',
        subpassword: '',
        subemail: '',
        changing: false,
        removing: false,
        reply: false
    }
    
    constructor(props: CommentProps) {
        super(props)
        this.state.comment = this.props.comment
    }

    static getDerivedStateFromProps(nextProps: CommentProps, prevState: any) {
        if (nextProps.comment !== prevState.comment){
            return {
                comment: nextProps.comment,
                password: '',
                changing: false,
                removing: false,
                reply: false
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
            this.setState({
                changing: false,
                removing: false,
                reply: false
            })
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
            changing: !this.state.changing,
            removing: false,
            reply: false
        })
    }

    remove = async () => {
        try {
            const res = await axios.delete(apiServer + `/comment/${this.props.comment.id}/`, {
                data: {password: this.state.password}
            })
            alert("성공적으로 변경 되었습니다.")
            this.setState({
                changing: false,
                removing: false,
                reply: false
            })
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
            changing: false,
            removing: !this.state.removing,
            reply: false
        })
    }

    subcomment = async () => {
        try {
            const subcomment = await axios.post(apiServer + `/comment/${this.state.comment}`, {
                writer: this.state.subwriter,
                password: this.state.subpassword,
                email: this.state.subemail,
                content: this.state.subcomment
            })
        } catch (e) {
            if (e.status == 400) alert("모든 정보를 입력 해 주세요")
        }
    }

    replyButton = () => {
        this.setState({
            changing: false,
            removing: false,
            reply: !this.state.reply
        })
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.state.changing) {
            return (
                <CommentContainer>
                    <CommentTop>
                        <span>{this.state.comment.writer}</span>
                        <i className="fas fa-reply" onClick={this.replyButton}></i>
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <input value={this.props.comment.content} placeholder="내용을 입력 해 주세요." onChange={this.handleChange} name='content' />
                    <input value={this.state.password} placeholder="비밀번호" onChange={this.handleChange} name='password' />
                </CommentContainer>
            )
        }
        else if (this.state.removing) {
            return (
                <CommentContainer>
                    <CommentTop>
                        <span>{this.state.comment.writer}</span>
                        <i className="fas fa-reply" onClick={this.replyButton}></i>
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <CommentContents>{this.props.comment.content}</CommentContents>
                    <input value={this.state.password} placeholder="비밀번호" onChange={this.handleChange} name='password' />
                </CommentContainer>
            )
        }
        else if (this.state.reply) {
            return (
                <CommentContainer>
                    <CommentTop>
                        <span>{this.state.comment.writer}</span>
                        <i className="fas fa-reply" onClick={this.replyButton}></i>
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <CommentContents>{this.props.comment.content}</CommentContents>
                    <SubCommentContainer>
                        <input value={this.state.subcomment} placeholder="내용을 입력 해 주세요" onChange={this.handleChange} name='subcomment' />
                        <input value={this.state.subwriter} placeholder="작성자" onChange={this.handleChange} name='subwriter' />
                        <input value={this.state.subemail} placeholder="이메일" onChange={this.handleChange} name='subemail' />
                        <input value={this.state.subpassword} placeholder="비밀번호" onChange={this.handleChange} name='subpassword' />
                    </SubCommentContainer>
                </CommentContainer>
            )
        }
        else {
            return (
                <CommentContainer>
                    <CommentTop>
                        <span>{this.state.comment.writer}</span>
                        <i className="fas fa-reply" onClick={this.replyButton}></i>
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <CommentContents>{this.props.comment.content}</CommentContents>
                </CommentContainer>
            )
        }
    }
}

export default Comment