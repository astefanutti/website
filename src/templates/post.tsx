import React from 'react'
import {Link, graphql} from 'gatsby'
import useDarkMode from 'use-dark-mode'

import Layout from '../components/layout'
import Head from '../components/head'

import {styled, createGlobalStyle, prism_light, prism_dark} from '../styles/theme'

const StyledUl = styled('ul')`
  list-style-type: none;

  li::before {
    content: '' !important;
    padding-right: 0 !important;
  }
`

export default ({data, pageContext}: {data: PageQueryData; pageContext: any}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const excerpt = post.frontmatter.excerpt || post.excerpt
  const image = post.frontmatter.image && post.frontmatter.image.childImageSharp.resize.src

  const darkMode = useDarkMode(false)
  const PrismTheme = createGlobalStyle`${darkMode.value ? prism_dark : prism_light}`

  return (
    <>
      <PrismTheme />
      <Layout title={siteTitle}>
        <Head title={post.frontmatter.title} description={excerpt} image={image} />
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <div className={'page-content'}>
            <div dangerouslySetInnerHTML={{__html: post.html}} />
            <StyledUl>
              {pageContext.previous && (
                <li>
                  <Link to={pageContext.previous.fields.slug} rel="prev">
                    ← {pageContext.previous.frontmatter.title}
                  </Link>
                </li>
              )}
              {pageContext.next && (
                <li>
                  <Link to={pageContext.next.fields.slug} rel="next">
                    {pageContext.next.frontmatter.title} →
                  </Link>
                </li>
              )}
            </StyledUl>
          </div>
        </article>
      </Layout>
    </>
  )
}

interface PageQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  markdownRemark: {
    id?: string
    excerpt?: string
    html: string
    frontmatter: {
      title: string
      date: string
      excerpt: string
      image?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 2500)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
          }
        }
        excerpt
      }
    }
  }
`
