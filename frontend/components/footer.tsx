import styled from 'styled-components'

const FooterBox = styled.div`
    width: 100%;
    text-align: center;
    border-top: 0.3px solid #eeeeee;
`

const FooterBanner = styled.div`
    font-size: 2rem;
    font-weight: bold;
`
const FooterContext = styled.div`
    
`

const Footer = (): JSX.Element => {
    return (
        <FooterBox>
            <FooterBanner>JUSTKODE</FooterBanner>
            <FooterContext>Copyright © <strong>D.Com.</strong> All rights reserved.</FooterContext>
        </FooterBox>
    )
}

export default Footer