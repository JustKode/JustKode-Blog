import styled from 'styled-components'

const HeaderBox = styled.div`
    width: 100%;
    height: 128px;
    margin: auto;
`

const Header = (): JSX.Element => {
    return (
        <HeaderBox>
            Hello! I'm Header!
        </HeaderBox>
    )
}

export default Header