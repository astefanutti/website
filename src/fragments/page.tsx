import { graphql } from 'gatsby'

export const query = graphql`
  fragment page on Mdx {
    frontmatter {
      title
      slug
      date(formatString: "MMM D, YYYY")
      tags
    }
    excerpt(pruneLength: 1000)
  }
`
