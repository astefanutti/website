import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

export default function () {
  return (
    <StaticQuery
      query={graphql`
        query {
          ...site
        }
      `}
      render={(data: Site) => {
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
