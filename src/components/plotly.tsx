import React from 'react'
import Loadable from 'react-loadable'
import * as Plotly from 'plotly.js'
import useDarkMode from 'use-dark-mode'

import {theme} from '../styles/theme'

const {dark, light} = theme

const ReactPlotly = Loadable({
  loader: () => import('react-plotly.js'),
  loading: ({timedOut}) =>
    timedOut ? <blockquote>Error: Loading Plotly timed out.</blockquote> : <span>Loading...</span>,
  timeout: 10000,
})

export default function({data, ...rest}: {data: Plotly.Data[]}) {
  const darkMode = useDarkMode()

  return (
    <ReactPlotly
      layout={{
        margin: {t: 0, r: 0, l: 35},
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
          color: darkMode.value ? dark.color : light.color,
          size: 14,
        },
        autosize: true,
      }}
      style={{width: '100%'}}
      useResizeHandler
      config={{
        displayModeBar: false,
        showTips: false,
      }}
      data={data}
      {...rest}
    />
  )
}
