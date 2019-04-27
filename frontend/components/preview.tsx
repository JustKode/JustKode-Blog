import {Component} from 'react'
import styled from 'styled-components'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const PreviewContainer = styled.div`
    width: 100%;
    min-width: ${tabletMaxRowSize};
    padding: ${sidePaddingSize};
    border-bottom: 0.3px solid #bbbbbb;
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
        
            </PreviewContainer>
        )
    }   
}

export default Preview