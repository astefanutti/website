const Benchmark = [
  { name: "Intel HD Graphics 510", score: 43274 },
  { name: "ARM Mali-G52 MP2", score: 25142 },
  { name: "ARM Mali-G52 MP6", score: 46944 },
  { name: "ARM Mali-T860 MP2", score: 9806.5 },
  { name: "NVIDIA Tegra X1 Maxwell", score: 57697 },
  { name: "AMD Radeon RX Vega 3", score: 80755 },
];

export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "3DMark Benchmark",
  background: null,
  width: "container",
  height: 150,
  config: {
    axis: {
      gridColor: "var(--color-line-secondary)",
    },
    style: {
      "guide-label": {
        font: "'JetBrains Mono', monospace",
        fill: "var(--color-text-emphasis)",
      },
      "guide-title": {
        font: "'JetBrains Mono', monospace",
        fill: "var(--color-text-emphasis)",
      },
      "group-title": {
        font: "'JetBrains Mono', monospace",
        fill: "var(--color-text-emphasis)",
      },
      "group-subtitle": {
        font: "'JetBrains Mono', monospace",
        fontStyle: "italic",
        fill: "var(--color-text-primary)",
      },
    },
    text: {
      font: "'JetBrains Mono', monospace",
      fontSize: 11,
    },
    view: {
      stroke: null,
    },
  },
  title: {
    text: "3DMark Ice Storm GPU Benchmark",
    subtitle: "more is better",
    offset: 20,
  },
  data: {
    name: "scores",
    values: Benchmark,
  },
  encoding: {
    y: {
      field: "name",
      type: "nominal",
      sort: "-x",
      title: null,
      axis: {
        ticks: false,
        labelPadding: 8,
        labelFontWeight: "bold",
        labelFontSize: 11,
      },
    },
    x: {
      field: "score",
      type: "quantitative",
      title: null,
      axis: {
        labelSeparation: 10,
        labelFlush: false,
      },
    },
  },
  layer: [{
    mark: {
      type: "bar",
      height: {
        band: 0.75,
      },
    },
    encoding: {
      color: {
        field: "score",
        type: "quantitative",
        scale: {
          domainMin: 0,
        },
        legend: {
          title: "Score",
          titleOrient: "bottom",
          gradientLength: 100,
          padding: 16,
          labelOffset: 10,
          tickCount: 1,
        },
      },
    }
  }, {
    mark: {
      type: "text",
      aria: false,
      align: {
        expr: "datum.score < 30000 ? 'left' : 'right'",
      },
      dx: {
        expr: "datum.score < 30000 ? 4 : -4",
      },
    },
    encoding: {
      text: {
        field: "score",
        type: "quantitative",
      },
      color: {
        condition: {
          test: {
            field: "score",
            gt: 30000,
          },
          value: "white",
        },
        value: "var(--color-text-emphasis)",
      },
    },
  }],
};
