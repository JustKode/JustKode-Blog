import * as React from "react";
import Layout from "../components/layout"
import Banner from "../components/banner"
import styled from "styled-components";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default () => {
  return (
    <Layout>
        <Banner></Banner>
    </Layout>
  )
}
