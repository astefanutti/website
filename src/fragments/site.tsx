import {graphql} from 'gatsby'

export const query = graphql`
  fragment site on Query {
    site {
      siteMetadata {
        title
        description
        social {
          github
          twitter
        }
      }
    }
  }
`
