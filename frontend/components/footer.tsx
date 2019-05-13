import styled from 'styled-components'
import { mainColor } from '../styles/color';

const FooterBox = styled.div`
    padding: 25px 0;
    width: 100%;
    text-align: center;
    border-top: 0.3px solid #dddddd;
`

const FooterBanner = styled.div`
    font-size: 2rem;
    font-weight: 900;
`

const FooterContext = styled.div`
    
`

const FooterLinkBox = styled.div`
    padding: 8px;
`

const FooterLink = styled.a`
    color: black;
    text-decoration: none;
    &:hover {
        color: ${mainColor}
    }

    padding: 0 8px;
`

const Footer = (): JSX.Element => {
    return (
        <FooterBox>
            <FooterBanner>JUSTKODE</FooterBanner>
            <FooterContext>Copyright © <strong>JUSTKODE</strong> All rights reserved.</FooterContext>
            <FooterLinkBox>
                <FooterLink href="https://github.com/JustKode">Github</FooterLink>
                <FooterLink href="https://www.facebook.com/profile.php?id=100014409812788"style={{borderLeft: '0.2px solid #dddddd', borderRight: '0.2px solid #dddddd'}}>Facebook</FooterLink>
                <FooterLink href="https://www.instagram.com/0ccean/">Instagram</FooterLink>
            </FooterLinkBox>
        </FooterBox>
    )
}

export default Footer