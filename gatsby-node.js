const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const isDevelopment = process.env.NODE_ENV === 'development'
const filter = isDevelopment ? '' : 'frontmatter: {published: {ne: false}}'

exports.createPages = async ({ graphql, actions }) => {
  const response = await graphql(`
    {
      posts: allMdx(
        filter: {${filter}}
        sort: {fields: frontmatter___date, order: DESC}
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              tags
              title
            }
          }
        }
      }
    }
  `)
  if (response.errors) throw new Error(response.errors)

  // Get the templates
  const postTemplate = path.resolve('./src/templates/post.tsx')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')

  // Create post pages
  const { posts } = response.data

  posts.edges.forEach((post, index, arr) => {
    actions.createPage({
      path: post.node.frontmatter.slug,
      component: postTemplate,
      context: {
        slug: post.node.frontmatter.slug,
      },
    })
  })

  // Iterate through each post, putting all found tags into `tags`
  let tags = []
  posts.edges.forEach(post => {
    if (post.node.frontmatter.tags) {
      tags = tags.concat(post.node.frontmatter.tags)
    }
  })
  const uniqTags = [...new Set(tags)]

  // Create tag pages
  uniqTags.forEach(tag => {
    if (!tag) return
    actions.createPage({
      path: `/tags/${tag}/`,
      component: tagTemplate,
      context: {
        tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
