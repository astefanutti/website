import React from 'react'
import {Link, graphql} from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

export default function ({data}: {data: any}) {
  const {posts, site} = data
  const {group} = posts

  return (
    <Layout title={site.siteMetadata.title}>
      <Head title="Tags" />
      <article>
        <h1>All tags</h1>
        <div className={'page-content'}>
          {group &&
            group.map(
              (tag: any) =>
                tag && (
                  <div key={tag.fieldValue}>
                    <h3>
                      <Link to={`/tags/${tag.fieldValue}/`}>{tag.fieldValue}</Link>
                    </h3>
                    <small>
                      {tag.totalCount} post
                      {tag.totalCount === 1 ? '' : 's'}
                    </small>
                  </div>
                ),
            )}
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
    ...site
    posts: allMdx(filter: {frontmatter: {published: {ne: false}}}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
