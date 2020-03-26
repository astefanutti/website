import React from 'react'
import {graphql} from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

export default function({data}: {data: Site}) {
  const {site} = data
  const {
    title,
    social: {github, twitter},
  } = site.siteMetadata

  return (
    <Layout title={title}>
      <Head title="About" />
      <article>
        <p>👋 Hi!</p>
        <p>
          My name is <i>Antonin Stefanutti</i>. I work as a <i>minimal</i> software engineer, that
          goes by the <i>Principles of Evolutionary Architecture</i>. I studied{' '}
          <i>Applied Mathematics</i>, and has always find <i>beauty</i> in the effectiveness of its
          abstractions and the conciseness of its symbolic notation. I tend to approach software
          engineering from the angle of my mathematical background, and try to balance the{' '}
          <i>perfectionism</i> that comes with it, with the reality of contemporary{' '}
          <i>productivism</i>. From time to time, I find myself enjoying a brief moment of{' '}
          <i>plenitude</i>, as I write code and think I've achieved that level of <i>beauty</i>.
        </p>
        <p>
          <a href={github}>GitHub</a>
          {' / '}
          <a href={twitter}>Twitter</a>
        </p>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
    ...site
  }
`
