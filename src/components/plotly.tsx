import React, { useContext } from 'react'
import { PlotParams } from 'react-plotly.js'
import useDarkMode from 'use-dark-mode'

import { theme } from '../styles/theme'
import { Context } from './context'

const { dark, light } = theme

const Plot = React.lazy(() => import('plotly.js/lib/core').then((Plotly: any) =>
  import('../plotly/sankey' as any)
    .then((module) => Plotly.register([module]))
    .then(() => import('react-plotly.js/factory'))
    .then((factory) => ({ default: factory.default(Plotly) as React.ComponentType<PlotParams> }))
));

export default function ({
  data,
  style,
  ...rest
}: {
  data: Plotly.Data[]
  style?: React.CSSProperties
}) {
  const darkMode = useDarkMode()
  const { isClient } = useContext(Context)

  return (
    isClient &&
    <ErrorHandler>
      <React.Suspense fallback={<span>Loading...</span>}>
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
            hoverlabel: {
              font: {
                family: '"JetBrains Mono", monospace',
              },
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
      </React.Suspense>
    </ErrorHandler>
  )
}

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorHandler extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <span style={{ backgroundColor: "tomato" }}>Error while loading Plotly!</span>;
    }

    return this.props.children;
  }
}
