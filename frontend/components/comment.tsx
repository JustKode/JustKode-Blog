import React, {Component} from "react"
import styled from "styled-components"
import axios from "axios"
import {apiServer, staticServer} from "../env"
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const CommentContainer = styled.div`
    padding: 10px 0;
    margin-left: 4px;
    border-bottom: 0.3px solid #bbbbbb;

    input {
        padding: 4px 8px;
        width: 308px;
        box-sizing: border-box;
    }

    textarea {
        display: block;
        padding: 4px 8px;
        width: 1000px;
        line-height: 2;
        box-sizing: border-box;
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

const CommentTop = styled.div`
    span {
        margin-right: 4px;
        font-size: 1.2rem;
        font-weight: bold;
    }

    i {
        margin: 0 2px;
    }
`

const CommentContents = styled.div`

`

const SubCommentContainer = styled.div`
    padding: 10px 0;
    margin-left: ${sidePaddingSize};
    border-bottom: 0.3px solid #bbbbbb;

    input {
        padding: 4px 8px;
        width: 308px;
        box-sizing: border-box;
    }

    textarea {
        display: block;
        padding: 4px 8px;
        width: 1000px;
        line-height: 2;
        box-sizing: border-box;
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
        content: '',
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
        this.state.content = this.props.comment.content
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

    resetStates = () => {
        this.setState({
            content: '',
            password: '',
            subcomment: '',
            subwriter: '',
            subpassword: '',
            subemail: '',
            changing: false,
            removing: false,
            reply: false
        })
    }

    modify = async () => {
        try {
            const res = await axios.put(staticServer + `/post/comment/${this.props.comment.id}`, {
                password: this.state.password,
                content: this.state.comment.content
            })
            alert("성공적으로 변경 되었습니다.")
            this.resetStates()
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
            const res = await axios.delete(staticServer + `/post/comment/${this.props.comment.id}`, {
                data: {password: this.state.password}
            })
            alert("성공적으로 변경 되었습니다.")
            this.resetStates()
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
            const subcomment = await axios.post(staticServer + `/post/comment/${this.state.comment.id}`, {
                writer: this.state.subwriter,
                password: this.state.subpassword,
                email: this.state.subemail,
                content: this.state.subcomment
            })
            alert("성공적으로 등록 되었습니다!")
            this.resetStates()
            this.props.reset()
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
                    <input value={this.state.content} placeholder="내용을 입력 해 주세요." onChange={this.handleChange} name='content' />
                    <input value={this.state.password} placeholder="비밀번호" onChange={this.handleChange} name='password' />
                    <input type="button" onClick={this.modify} value="제출" />
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
                    <CommentContents>{this.state.comment.content}</CommentContents>
                    <input type="password" value={this.state.password} placeholder="비밀번호" onChange={this.handleChange} name='password' />
                    <input type="button" onClick={this.remove} value="제출" />
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
                    <CommentContents>{this.state.comment.content}</CommentContents>
                    <SubCommentContainer>
                        <input type="text" value={this.state.subwriter} placeholder="작성자" onChange={this.handleChange} name='subwriter' />
                        <input type="email" value={this.state.subemail} placeholder="이메일" onChange={this.handleChange} name='subemail' />
                        <input type="password" value={this.state.subpassword} placeholder="비밀번호" onChange={this.handleChange} name='subpassword' />
                        <textarea value={this.state.subcomment} placeholder="내용을 입력 해 주세요" onChange={this.handleChange} name='subcomment' />
                        <input type="button" onClick={this.subcomment} value="제출" />
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
                    <CommentContents>{this.state.comment.content}</CommentContents>
                </CommentContainer>
            )
        }
    }
}

export default Comment