import React, {Component} from "react"
import Head from 'next/head'
import Layout from "../../../components/layout"
import Banner from "../../../components/banner"
import Preview from "../../../components/preview"
import styled from "styled-components"
import axios from 'axios'
import {apiServer} from '../../../env'
import {phoneMaxRowSize, tabletMaxRowSize, sidePaddingSize} from '../../../styles/layout'


const MainContainer = styled.div`
  text-align: center;
`

const SubContainer = styled.div`
  display: inline-block;
  width: 100%;
  max-width: ${tabletMaxRowSize};
  margin: 20px 0;
`

const Title = styled.div`
  span {
    font-size: 2rem;
    border-bottom: 0.4rem solid black;
    font-weight: bold;
  }
  
  margin: 1rem;
`

class PostAll extends Component<any, any> {
  static async getInitialProps({ query }) {
    const board = await axios.get(apiServer + '/board')
    const posts = await axios.get(apiServer + '/board/all')
    return {
      board: board.data,
      posts: posts.data
    }
  }

  render() {
    console.log(this.props.board)
    console.log(this.props.posts)

    /*const mountedPost = this.props.posts.map((post: any, i: number) => {
      return (
      <Preview
        key={i}
        img={post.image}
        title={post.title}
        commentCount={post.comment_count}
        content={post.summery}
        category={post.category_name}
        writedAt={post.writedAt}
        postId={post.id}
        categoryLink={post.categoryLink} />
        )
    })
*/
    return (
      <Layout>
        <MainContainer>
          <SubContainer>
            <Title>Recent Post</Title>
          </SubContainer>
        </MainContainer>
      </Layout>
    )
  }
}

export default PostAll