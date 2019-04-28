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
    position: relative;

    a {
        text-decoration: none;
        color: black;
    }
`

const PreviewTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0;
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
    color: #444444;
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
    content: string,
    category: string,
    postLink: string,
    categoryLink: string
}

class Preview extends Component<PreviewProps, any> {
    render() {
        return (
            <PreviewContainer>
                <PreviewSubContainer>
                    <a href={this.props.postLink}>
                        <PreviewTitle className="title">{this.props.title}</PreviewTitle>
                        <PreviewContent className="content">{this.props.content}</PreviewContent>
                    </a>
                    <PreviewBottom>
                        <i className="far fa-folder-open"></i>
                        <a href={this.props.categoryLink}><span> {this.props.category}</span></a>
                    </PreviewBottom>
                </PreviewSubContainer>
                <PreviewImg src={this.props.img}></PreviewImg>
            </PreviewContainer>
        )
    }   
}

export default Preview