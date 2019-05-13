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
    padding: 0 20px;
  }
`

class SubCategoryAll extends Component<any, any> {
  static async getInitialProps({ query }: any) {
    try {
      const posts = await axios.get(apiServer + `/board/${query.category}/${query.subcategory}/${query.page || 1}/`)
      console.log(posts.data)
      return {
        posts: posts.data.posts,
        page: Number(query.page || 1),
        category: posts.data.category,
        subcategory: posts.data.subcategory
      }
    } catch (e) {
      return {
          error: e.status
      }
    }
  }

  render() {
    if (this.props.error) {
        return (<Error statusCode={this.props.error} />)
    }  

    let postlist

    if (this.props.posts.length === 0 || this.props.page === 0) {
      postlist = (<div>포스트가 존재하지 않습니다.</div>)
    } else {
      postlist = this.props.posts.map((post: any, i: number) => {
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
    }

    return (
      <Layout>
        <MainContainer>
          <SubContainer>
            <Title><span>{this.props.category.full_name} : Page {this.props.page || 1}</span></Title>
            {postlist}
            <MorePost>
              {this.props.page > 1 && (
                <Link route={`/board/${this.props.category.full_url}/${this.props.page - 1}`}>
                  <span><i className="fas fa-caret-left"></i> 이전</span>
                </Link>
                )}
              {(this.props.posts.length === 10 && this.props.page >= 1) && (
                <Link route={`/board/${this.props.category.full_url}/${this.props.page + 1}`}>
                  <span>다음 <i className="fas fa-caret-right"></i></span>
                </Link>
              )}
            </MorePost>
          </SubContainer>
        </MainContainer>
      </Layout>
    )
  }
}

export default SubCategoryAll