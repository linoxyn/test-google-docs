import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/layout'

const PostTemplate = ({data: {post}}) => (
  <Layout>
    {post.frontmatter.cover && (
      <Img
        style={{width: "200px", marginBottom: "2rem"}}
        fluid={
          post.frontmatter.cover.image.childImageSharp.fluid
        }
      />
    )}
    <div dangerouslySetInnerHTML={{__html: post.html}} />
  </Layout>
)

export default PostTemplate

export const pageQuery = graphql`
  query TestPost($path: String!) {
     post: markdownRemark(frontmatter: {path: {eq: $path}}) {
        html
       frontmatter {
         cover {
            image {
              childImageSharp {
                fluid(maxWidth: 200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
       }
     }
  }
`