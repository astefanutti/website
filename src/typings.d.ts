declare module '*.png'

interface Site {
  site: {
    siteMetadata: {
      title: string
      description: string
      social: {
        github: string
        twitter: string
      }
    }
  }
}

interface Theme {
  color: string
  backgroundColor: string
  inlineCodeBgColor: string
}
