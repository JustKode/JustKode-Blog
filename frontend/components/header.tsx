import React, {Component} from 'react'
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

    @media (max-width: ${phoneMaxRowSize}) {
      ul {
        display: none;
      }

      ul.checked {
        position: fixed;
        top: 80px;
        right: 0;
        display: inline-block;
      }
      ul.checked li{
        display: block;
        width: 100px;
        text-align: right;
        color: white;
        background-color: #444444;
      }
      ul.checked li>a{
        padding: 0;
        padding-right: 10px;
      }
      ul.checked li>a:hover{
        color: white;
      }
      ul.checked li:hover{
        color: white;
        background-color: #888888;
      }
    }
    
    ul {
      float: right;
      margin: 0;
      padding: 0;
    }
    
    li {
      transition: 0.4s;
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
  height: 80.3px;
`

const CustomButton = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 40px;
  margin: 20px;

  @media (min-width: ${phoneMaxRowSize}) {
    display: none;
  }
`

interface HeaderState {
  check: boolean
}

class Header extends Component<any, HeaderState> {
  state: HeaderState = {
    check: false
  }

  onToggle = () => {
    this.setState({
      check: !this.state.check
    })
  }

  render() {
    return (
      <div style={{borderBottom: '0.3px solid #eeeeee'}}>
          <MainContainer>
              <HeaderBox>
                <Banner>JUSTKODE</Banner>
                <CustomButton className="fa fa-bars" onClick={this.onToggle}></CustomButton>
                <ul className={`${this.state.check && 'checked'}`}>
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
}

export default Header