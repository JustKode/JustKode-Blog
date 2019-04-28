import {Component} from 'react'
import styled from 'styled-components'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const PreviewContainer = styled.div`
    width: 100%;
    max-width: ${tabletMaxRowSize};
    padding: 0 10px;
    margin-bottom: ${sidePaddingSize};
    border-bottom: 0.3px solid #bbbbbb;
    display: block;
    text-align: left;

    a {
        text-decoration: none;
        color: black;
    }
`

const PreviewTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0;

    span {
        font-size: 0.9rem;
        font-weight: 300;
        color: orange;
    }
`

const PreviewContent = styled.div`
    font-size: 0.9rem;
    line-height: 1.3rem;
    height: 2.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
`

const PreviewImg = styled.img`
    width: 170px;
    height: 100px;
    float: right;
    margin-right: 1rem;
    margin-top: 10px;
    @media (max-width: ${phoneMaxRowSize}) {
        width: 100px;
        height: 70px;
        margin-top: ${sidePaddingSize};
    }
`

const PreviewBottom = styled.div`
    margin: 0.3rem 0;
    font-size: 0.8rem;
    color: #888888;
    a {
        color: #888888;
    }
    &>span {
        margin-right: 1rem;
    }
    i {
        margin-right: 0.2rem;
    }
`

const PreviewSubContainer = styled.div`
    display: inline-block;
    width: calc(100% - 200px);
    @media (max-width: ${phoneMaxRowSize}) {
        width: calc(100% - 130px);
    }
`

interface PreviewProps {
    img: string,
    title: string,
    commentCount: number,
    content: string,
    category: string,
    writedAt: string,
    postLink: string,
    categoryLink: string,
}

class Preview extends Component<PreviewProps, any> {
    render() {
        return (
            <PreviewContainer>
                <PreviewSubContainer>
                    <a href={this.props.postLink}>
                        <PreviewTitle>{this.props.title} <span>[{this.props.commentCount}]</span></PreviewTitle>
                        <PreviewContent>{this.props.content}</PreviewContent>
                    </a>
                    <PreviewBottom>
                        <span>
                            <i className="far fa-folder-open"></i>
                            <a href={this.props.categoryLink}><span> {this.props.category}</span></a>
                        </span>
                        <span>
                            <i className="far fa-clock"></i>
                            <span>{this.props.writedAt}</span>
                        </span>    
                    </PreviewBottom>
                </PreviewSubContainer>
                <PreviewImg src={this.props.img}></PreviewImg>
            </PreviewContainer>
        )
    }   
}

export default Preview