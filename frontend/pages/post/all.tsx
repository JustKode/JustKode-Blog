import React, {Component, Fragment} from "react"
import Head from 'next/head'
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
  text-align: left;
  max-width: 512px;
  width: 100%;
  margin: 4px;
`

const CategoryContainer = styled.div`
  padding: 8px 16px;
  border-bottom: 0.5px solid black;

  a {
    text-decoration: none;
    color: black;
  }
`

const SubCategoryContainer = styled.div`
  padding: 6px 12px;
  border-bottom: 0.5px solid black;
  margin-left: ${sidePaddingSize};

  a {
    text-decoration: none;
    color: black;
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
      return {
        board: {},
        posts: []
      }
    }
  }

  render() {
    const boardlist = this.props.board.map((category: any, i: number) => {
      const subboardlist = category.subcategorys.map((subcategory: any, j: number) => {
        return (
          <SubCategoryContainer key={j}>
            - <Link route="board/subcategory" params={{category: category.url, subcategory: subcategory.url, page: 1}}>{subcategory.name}</Link>
          </SubCategoryContainer>
        )
      })
      return (
        <Fragment key={i}>
          <CategoryContainer>
            - <Link route="board/category" params={{category: category.url, page: 1}}>{category.name}</Link>
          </CategoryContainer>
          {subboardlist}
        </Fragment>
      )
    })

    const postlist = this.props.posts.map((post: any, i: number) => {
      return (
        <Preview 
          key={i}
          img={apiServer + post.image}
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

    return (
      <Layout>
        <MainContainer>
          <SubContainer>
            <Title><span>Board List</span></Title>
            <ListContainer>
              {boardlist}
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