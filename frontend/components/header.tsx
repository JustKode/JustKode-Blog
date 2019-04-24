import styled from 'styled-components'
import {mainColor} from '../styles/color'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../styles/layout'

const HeaderBox = styled.div`
    width: ${tabletMaxRowSize};
    margin: auto;
    padding: 25px 0;
    
    @media (max-width: ${tabletMaxRowSize}) {
      width: 100%;
    }
    
    ul {
      float: right;
      margin: 0;
      padding: 0;
    }
    
    li {
      text-decoration: none;
      display: inline-block;
    }
    
    a {
      padding: ${sidePaddingSize};
    }
`

const ListElement = styled.a`
  transition: 0.4s;
  
  &:hover {
    color: ${mainColor}
  }
`

const Banner = styled.a`
  font-weight: bold;
  font-size: 1.3rem;
`

const MainContainer = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: white;
`

const Air = styled.div`
  height: 80px;
`

const Header = (): JSX.Element => {
    return (
        <div>
            <MainContainer>
                <HeaderBox>
                    <Banner>JUSTKODE</Banner>
                    <ul>
                        <li><ListElement>Home</ListElement></li>
                        <li><ListElement>Info</ListElement></li>
                        <li><ListElement>Post</ListElement></li>
                    </ul>
                </HeaderBox>
            </MainContainer>
            <Air></Air>
        </div>
    )
}

export default Header