import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'
import Bio from '../components/bio'

export default function ({ data }: { data: any }) {
  const { site, posts } = data

  return (
    <Layout title={site.siteMetadata.title}>
      <Head title="Posts" />
      <Bio />
      <article>
        <div className={'page-content'}>
          {posts.edges.map(({ node }: { node: any }) => {
            const excerpt = node.frontmatter.excerpt || node.excerpt
            const title = node.frontmatter.title || node.frontmatter.slug
            return (
              <div key={node.frontmatter.slug}>
                <h3>
                  <Link to={node.frontmatter.slug}>{title}</Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p>{excerpt}</p>
              </div>
            )
          })}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  {
    ...site
    posts: allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          ...page
        }
      }
    }
  }
`
