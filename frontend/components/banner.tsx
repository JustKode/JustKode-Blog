import {Component} from 'react'
import styled from 'styled-components'
import {mainColor} from '../styles/color'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const MainContainer = styled.div`
    position: relative;
    background-color: #444444;
    height: 360px;
    text-align: center;
    color: white;
`

const SubContainer = styled.div`
    display: inline-block;
    width: ${tabletMaxRowSize};
    @media (max-width: ${tabletMaxRowSize}) {
        width: 100%;
    }
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const TitleContext = styled.div`
    font-weight: bolder;
    font-size: 2rem;
    text-align: left;
    width: ${phoneMaxRowSize};
    padding: ${sidePaddingSize};
`

const SubContext = styled.div`
    font-size: 1.5rem;
    text-align: left;
    width: ${phoneMaxRowSize};
    padding: ${sidePaddingSize};
`

class Banner extends Component<any, any> {
    render() {
        return (
            <MainContainer>
                <SubContainer>
                    <TitleContext>멋이 다 흘러</TitleContext>
                    <SubContext>흘러서 넘쳐 멀어 버렸어 배로 막 벌어 어머 눈이 와 눈이 와 눈이 와 눈이 와</SubContext>
                </SubContainer>
            </MainContainer>
        )
    }
}

export default Banner