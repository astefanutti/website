import React from 'react'
import {graphql} from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

export default function ({data}: {data: Site}) {
  const {site} = data

  return (
    <Layout title={site.siteMetadata.title}>
      <Head title="404" />
      <h1>Not Found</h1>
      <p>There is nothing there...</p>
    </Layout>
  )
}
export const query = graphql`
  query {
    ...site
  }
`
