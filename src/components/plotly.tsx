import React from 'react'
import Loadable from 'react-loadable'
import { PlotParams } from 'react-plotly.js'
import useDarkMode from 'use-dark-mode'

import { theme } from '../styles/theme'

const { dark, light } = theme

const Plot = Loadable({
  loader: () =>
    import('plotly.js/lib/core').then((Plotly: any) =>
      import('../plotly/sankey' as any)
        .then((module) => Plotly.register([module]))
        .then(() => import('react-plotly.js/factory'))
        .then((factory) => factory.default(Plotly)),
    ) as Promise<React.ComponentType<PlotParams>>,
  loading: ({ timedOut }) =>
    timedOut ? <blockquote>Error: Loading Plotly timed out.</blockquote> : <span>Loading...</span>,
  timeout: 10000,
})

export default function ({
  data,
  style,
  ...rest
}: {
  data: Plotly.Data[]
  style?: React.CSSProperties
}) {
  const darkMode = useDarkMode()

  return (
    <Plot
      layout={{
        margin: { t: 0, r: 0, l: 35 },
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        font: {
          family: '"JetBrains Mono", monospace',
          color: darkMode.value ? dark.color : light.color,
          size: 14,
        },
        autosize: true,
      }}
      style={Object.assign({ width: '100%', clear: 'both' }, style)}
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
