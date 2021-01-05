import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

export default function ({ data, pageContext }: { data: any; pageContext: any }) {
  const { posts, site } = data
  const { tag } = pageContext

  return (
    <Layout title={site.siteMetadata.title}>
      <Head title={`Posts tagged "${tag}"`} keywords={[tag]} />
      <article>
        <header>
          <h1>
            Posts tagged <i>"{tag}"</i>
          </h1>
        </header>
        <div className={'page-content'}>
          {posts.edges.map(({ node }: { node: any }) => {
            const title = node.frontmatter.title || node.frontmatter.slug
            const excerpt = node.frontmatter.excerpt || node.excerpt
            return (
              <div key={node.frontmatter.slug}>
                <h3>
                  <Link to={`/${node.frontmatter.slug}`}>{title}</Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              </div>
            )
          })}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($tag: String) {
    ...site
    posts: allMdx(limit: 1000, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          ...page
        }
      }
    }
  }
`
