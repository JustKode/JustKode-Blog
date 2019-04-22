import styled from 'styled-components'

const FooterBox = styled.div`
    width: 100%;
    height: 128px;
    margin: auto;
`

const Footer = (): JSX.Element => {
    return (
        <FooterBox>
            Hello! I'm Header!
        </FooterBox>
    )
}

export default Footer