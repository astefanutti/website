import React from 'react'
import { Link } from 'gatsby'

import { styled } from '../styles/theme'
import DayNightToggle from './dark'

const StyledNav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 68px;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      margin: 16px;

      a {
        background: none;
      }
    }
  }
`

const StyledFooter = styled.footer`
  padding-bottom: 36px;
`

interface Props {
  readonly title?: string
}

export default class Layout extends React.Component<Props> {
  render() {
    const { children } = this.props

    return (
      <>
        <StyledNav className="navigation">
          <ul>
            <li style={{ marginLeft: 0 }}>
              <Link to={'/'}>Posts</Link>
            </li>
            <li>
              <Link to={'/tags'}>Tags</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <a href="/rss">RSS</a>
            </li>
            <li style={{ marginLeft: 'auto', marginRight: 0 }}>
              <DayNightToggle />
            </li>
          </ul>
        </StyledNav>
        <main className="content" role="main">
          {children}
        </main>
        <StyledFooter className="footer">
          © {new Date().getFullYear()}, <a href="https://ttt.io">ttt.io</a>. Open{' '}
          <a href="https://github.com/astefanutti/website">source</a>, powered by{' '}
          <a href="https://gatsbyjs.org">Gatsby</a> and <a href="https://github.com">GitHub</a>.
        </StyledFooter>
      </>
    )
  }
}
