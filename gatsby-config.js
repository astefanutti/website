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
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        plugins: [
          `gatsby-remark-images`,
          `gatsby-remark-autolink-headers`,
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1280,
              linkImagesToOriginal: false,
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
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
        remarkPlugins: [
          require('@tufte-markdown/remark-figure-parser'),
          require('@tufte-markdown/remark-figure-transformer'),
          require('./plugins/remark-sidenotes'),
          require('./plugins/remark-tufte-section'),
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
            serialize: ({ query: { site, posts} }) => {
              const { siteUrl } = site.siteMetadata
              return posts.edges.map(({ node }) => {
                const { slug } = node.frontmatter
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  url: siteUrl + '/' + slug,
                  guid: siteUrl + '/' + slug,
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
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
  ],
}
