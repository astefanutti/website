const Benchmark = [
  { name: "AMD Radeon™ Vega 3", score: 4406 },
  { name: "NVIDIA Tegra X1 (rev B)", score: 4312 },
  { name: "Mali-G610 MC4", score: 3522 },
  { name: "Mali-G52", score: 1006 },
  { name: "Mali-T860", score: 67 },
  { name: "Intel® HD Graphics 510", score: 2630 },
  { name: "VideoCore VI (V3D-620)", score: 76 },
];

export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Geekbench Vulkan Benchmark",
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
    text: "Geekbench Vulkan Benchmark",
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
          padding: 20,
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
        expr: "datum.score < 1500 ? 'left' : 'right'",
      },
      dx: {
        expr: "datum.score < 1500 ? 4 : -4",
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
            gt: 2000,
          },
          value: "white",
        },
        value: "var(--color-text-emphasis)",
      },
    },
  }],
};
