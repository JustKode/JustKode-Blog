import {Component} from 'react'
import styled from 'styled-components'
// @ts-ignore
import ReactRotatingText from 'react-rotating-text'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const MainContainer = styled.div`
    background-image: url('/static/banner-image.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @keyframes move {
        from {background-position: center top;}
        to {background-position: center;}
    }

    animation-name: move;
    animation-duration: 30s;
    animation-timing-function: ease;

    position: relative;
    background-color: black;
    
    height: 360px;
    text-align: center;
    color: white;
    z-index: -1;
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
    font-weight: 900;
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

    @media (max-width: ${phoneMaxRowSize}) {
        width: 100%;
    }
`

class Banner extends Component<any, any> {
    render() {
        return (
            <MainContainer>
                <SubContainer>
                    <TitleContext>JUSTKODE</TitleContext>
                    <SubContext>Hello! I'm <ReactRotatingText items={['JustKode!', 'Student Programmer!', 'Python Programmer!', 'JavaScript Programmer!', 'Full Stack Programmer!', 'Data Engineer!']} /></SubContext>
                </SubContainer>
            </MainContainer>
        )
    }
}

export default Banner