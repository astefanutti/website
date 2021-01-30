'use strict'

module.exports = {
  siteMetadata: {
    title: 'Antonin Stefanutti',
    description: '/dev/null',
    siteUrl: 'https://ttt.io',
    author: {
      name: 'Antonin Stefanutti',
      url: 'https://twitter.com/a7tti',
    },
    social: {
      twitter: 'https://twitter.com/a7tti',
      github: 'https://github.com/astefanutti',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark-mode',
        classNameLight: 'light-mode',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        plugins: [
          {
            resolve: require.resolve('./plugins/gatsby-remark-images'),
          },
          'gatsby-remark-autolink-headers',
        ],
        gatsbyRemarkPlugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: require.resolve('./plugins/gatsby-remark-images'),
            options: {
              maxWidth: 760,
              linkImagesToOriginal: false,
              srcSetBreakpoints: [1000, 1500, 2000, 2500],
            },
          },
          {
            resolve: 'gatsby-remark-vscode',
            options: {
              injectStyles: true,
              extensions: [
                'vscode-theme-darcula',
              ],
              theme: {
                default: 'Light (Visual Studio)',
                parentSelector: {
                  'body[class=dark-mode]': 'Darcula',
                  'body[class=light-mode]': 'Solarized Light',
                },
              },
            },
          },
          {
            resolve: 'gatsby-remark-katex',
            options: {
              // KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md
              strict: 'ignore',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
        remarkPlugins: [
          require('./plugins/remark-sidenotes'),
          require('./plugins/remark-tufte-section'),
          require('./plugins/remark-figure-parser'),
          require('./plugins/remark-figure-transformer'),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://ttt.io',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Antonin Stefanutti',
        short_name: 'ttt.io',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/logo.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-feed-mdx',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, posts } }) => {
              const { siteUrl } = site.siteMetadata
              return posts.edges.map(({ node }) => {
                const { slug, image } = node.frontmatter
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  url: siteUrl + '/' + slug,
                  guid: siteUrl + '/' + slug,
                  enclosure: image && {
                    url: siteUrl + image.publicURL,
                  },
                  // custom_elements: [{ 'content:encoded': node.html }],
                }
              })
            },
            query: `{
              posts: allMdx(
                sort: { fields: frontmatter___date, order: DESC }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      slug
                      date(formatString: "MMM D, YYYY")
                      image {
                        publicURL
                      }
                    }
                    excerpt
                    html
                  }
                }
              }
            }`,
            output: '/rss.xml',
            title: 'Antonin Stefanutti',
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
  ],
}
