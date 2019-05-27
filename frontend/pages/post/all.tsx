import React, {Component, Fragment} from "react"
import Error from 'next/error'
import Layout from "../../components/layout"
import Banner from "../../components/banner"
import Preview from "../../components/preview"
import styled from "styled-components"
import axios from 'axios'
import {apiServer} from '../../env'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../../styles/layout'
const route = require('../../routes')
const {Link, Route} = route

const MainContainer = styled.div`
  text-align: center;
`

const SubContainer = styled.div`
  display: inline-block;
  width: 100%;
  max-width: ${tabletMaxRowSize};
  margin: 20px 0;
`

const ListContainer = styled.div`
  display: inline-block;
  text-align: center;
  max-width: 512px;
  width: 100%;
  margin: 4px;

  ul {
    display: inline-block;
    text-align: left;
    list-style: none;
    margin: 0px;
    padding: 0px;
  
    max-width: 250px;
    width: 100%;
  }

  li {
    padding: 5px 0px 5px 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #dddddd;
    font-size: 0.9rem;
    cursor: pointer;
  }

  li:hover{
    background-color: #e4e4e4;
  }

  ul ul>li:before {
    content: "ㄴ";
    padding-right: 4px;
  }

  ul ul>li {
    margin-left: ${sidePaddingSize};
  }

`
const Title = styled.div`
  span {
    font-size: 2rem;
    border-bottom: 0.4rem solid black;
    font-weight: bold;
  }
  
  margin: 1rem;
`

const MorePost = styled.div`
  span {
    font-size: 1.3rem;
    font-weight: bold;
    color: black;
    cursor: pointer;
  }
`

const Button = styled.span`
  display: inline-block;
  color: black;
  padding: 16px 32px;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
`

class PostAll extends Component<any, any> {
  static async getInitialProps({ query }: any) {
    try {
      const board = await axios.get(apiServer + '/board')
      const posts = await axios.get(apiServer + '/board/all')
      return {
        board: board.data,
        posts: posts.data
      }
    } catch (e) {
      return {error: e.response.status}
    }
  }

  state = {
    toggle: false
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    if (this.props.error) {
      return (<Error statusCode={this.props.error} />)
    }  

    // posts components
    const postlist = this.props.posts.map((post: any, i: number) => {
      return (
        <Preview 
          key={i}
          img={post.image}
          title={post.title}
          commentCount={post.comment_count}
          content={post.summary}
          category={post.category_name}
          writedAt={post.writedAt}
          postId={post.id}
          categoryLink={post.category_url}
        />
      )
    })

    let toggleList

    if (this.state.toggle) {
      const boardlist = this.props.board.map((category: any, i: number) => {
        const subboardlist = category.subcategorys.map((subcategory: any, j: number) => {
          return (
            <Link route="board/subcategory" params={{category: category.url, subcategory: subcategory.url, page: 1}} key={j}><li>
              {subcategory.name}
            </li></Link>
          )
        })
        return (
          <Fragment key={i}>
            <Link route="board/category" params={{category: category.url, page: 1}}><li>
              {category.name}
            </li></Link>
            <ul>
              {subboardlist}
            </ul>
          </Fragment>
        )
      })

      toggleList = (
        <Fragment>
          <ul>{boardlist}</ul>
          <div><Button onClick={this.toggle}><i className="fas fa-chevron-up"></i> 접기</Button></div>
        </Fragment>
      )
    } else {
      toggleList = (
        <div><Button onClick={this.toggle}><i className="fas fa-chevron-down"></i> 펼치기</Button></div>
      )
    }

    return (
      <Layout>
        <MainContainer>
          <Banner></Banner>
          <SubContainer>
            <Title><span>Board List</span></Title>
            <ListContainer>
              {toggleList}
            </ListContainer>
          </SubContainer>
          <SubContainer>
            <Title><span>Recent Post</span></Title>
            {postlist}
            <MorePost>
              <Link route="post/list" params={{page: 1}}>
                <span><i className="fas fa-plus"></i> 더 보기</span>
              </Link>
            </MorePost>
          </SubContainer>
        </MainContainer>
      </Layout>
    )
  }
}

export default PostAll