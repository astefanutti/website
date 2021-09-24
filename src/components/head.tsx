import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import useDarkMode from 'use-dark-mode'

import { theme } from '../styles/theme'

type StaticQueryData = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: {
        name: string
      }
    }
  }
}

interface Props {
  readonly title: string
  readonly image?: string
  readonly description?: string
  readonly lang?: string
  readonly keywords?: string[]
}

export default function (props: Props) {
  const darkMode = useDarkMode()
  return (
    <StaticQuery
      query={graphql`
          query {
            site {
              siteMetadata {
                title
                description
                author {
                  name
                }
              }
            }
          }
        `}
      render={(data: StaticQueryData) => {
        const description = props.description || data.site.siteMetadata.description || ''
        const lang = props.lang || 'en'
        const title = props.title
        const image = props.image ? `https://ttt.io/${props.image}` : ''
        const keywords = props.keywords || []
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: description,
              },
              {
                name: 'theme-color',
                content: darkMode.value ? theme.dark.backgroundColor : theme.light.backgroundColor,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: description,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:image',
                content: image,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author.name,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: description,
              },
            ].concat(
              keywords.length > 0
                ? {
                  name: 'keywords',
                  content: keywords.join(`, `),
                }
                : [],
            )}
          />
        )
      }}
    />
  )
}
