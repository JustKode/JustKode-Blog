import React, {Component} from "react"
import styled from "styled-components"
import axios from "axios"
import {apiServer, staticServer} from "../env"
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'


const CommentContainer = styled.div`
    margin-left: ${sidePaddingSize};
    padding: 10px 0;
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

interface SubCommentObject {
    id: number,
    parent: number,
    writer: string,
    email: string,
    content: string,
    writedAt: string
}

interface CommentProps {
    comment: SubCommentObject,
    reset(): void,
}

class SubComment extends Component<CommentProps, any> {
    state = {
        comment: {
            id: 0,
            parent: 0,
            writer: '',
            email: '',
            content: '',
            writedAt: ''
        },
        content: '',
        password: '',
        changing: false,
        removing: false,
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
            }
        }
        return null
    }

    resetStates = () => {
        this.setState({
            content: '',
            password: '',
            changing: false,
            removing: false
        })
    }

    modify = async () => {
        try {
            const res = await axios.put(staticServer + `/post/subcomment/${this.props.comment.id}/`, {
                password: this.state.password,
                content: this.state.content
            })
            alert("성공적으로 변경 되었습니다.")
            this.resetStates()
            this.props.reset()
        } catch(e) {
            if (e.response.status == 400) alert("비밀번호가 일치하지 않습니다.")
            else if (e.response.status == 404) {
                alert("댓글이 존재하지 않습니다.")
                this.props.reset()
            }
        }
    }

    modifyButton = () => {
        this.setState({
            changing: !this.state.changing,
            removing: false,
        })
    }

    remove = async () => {
        try {
            const res = await axios.delete(staticServer + `/post/subcomment/${this.props.comment.id}/`, {
                data: {password: this.state.password}
            })
            alert("성공적으로 변경 되었습니다.")
            this.resetStates()
            this.props.reset()
        } catch(e) {
            if (e.response.status == 400) alert("비밀번호가 일치하지 않습니다.")
            else if (e.response.status == 404) {
                alert("댓글이 존재하지 않습니다.")
                this.props.reset()
            }
        }
    }

    removeButton = () => {
        this.setState({
            changing: false,
            removing: !this.state.removing,
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
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <textarea value={this.state.content} placeholder="내용을 입력 해 주세요." onChange={this.handleChange} name='content' />
                    <input type="password" value={this.state.password} placeholder="비밀번호" onChange={this.handleChange} name='password' />
                    <input type="button" onClick={this.modify} value="제출" />
                </CommentContainer>
            )
        }
        else if (this.state.removing) {
            return (
                <CommentContainer>
                    <CommentTop>
                        <span>{this.state.comment.writer}</span>
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <CommentContents>{this.props.comment.content}</CommentContents>
                    <input type="password" value={this.state.password} placeholder="비밀번호" onChange={this.handleChange} name='password' />
                    <input type="button" onClick={this.remove} value="제출" />
                </CommentContainer>
            )
        }
        else {
            return (
                <CommentContainer>
                    <CommentTop>
                        <span>{this.state.comment.writer}</span>
                        <i className="far fa-edit" onClick={this.modifyButton}></i>
                        <i className="fas fa-times" onClick={this.removeButton}></i>
                    </CommentTop>
                    <CommentContents>{this.props.comment.content}</CommentContents>
                </CommentContainer>
            )
        }
    }
}

export default SubComment