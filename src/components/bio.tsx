import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

type StaticQueryData = {
  site: {
    siteMetadata: {
      description: string
      social: {
        github: string
        twitter: string
      }
    }
  }
}

export default function() {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              description
              social {
                github
                twitter
              }
            }
          }
        }
      `}
      render={(data: StaticQueryData) => {
        const {description, social} = data.site.siteMetadata
        return (
          <div>
            <h1>{description}</h1>
            <p>
              By Antonin Stefanutti
              <br />
              <a href={social.github}>GitHub</a>
              {' / '}
              <a href={social.twitter}>Twitter</a>
            </p>
          </div>
        )
      }}
    />
  )
}
