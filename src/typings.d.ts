declare module '*.png'

interface Site {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

interface Theme {
  color: string
  backgroundColor: string
}
