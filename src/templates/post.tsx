import React from 'react'
import {graphql} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'
import {MDXProvider} from '@mdx-js/react'

import Head from '../components/head'
import Layout from '../components/layout'
import Plotly from '../components/plotly'

export default ({data}: {data: any}) => {
  const {post, site} = data
  const {excerpt, body, image} = post

  return (
    <MDXProvider components={{Plotly}}>
      <Layout title={site.siteMetadata.title}>
        <Head title={post.frontmatter.title} description={excerpt} image={image} />
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <div className={'page-content'}>
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </article>
      </Layout>
    </MDXProvider>
  )
}

export const query = graphql`
  query($slug: String!) {
    ...site
    post: mdx(frontmatter: {slug: {eq: $slug}}) {
      body
      ...page
    }
  }
`
