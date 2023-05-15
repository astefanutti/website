const SBCs= [
  { name: "Jetson Nano", price: 149, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [128, 235.8, 14.74] },
  { name: "ODROID-N2L", price: 130, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [96, 157.4, 6.8] },
  { name: "Orange Pi 5", price: 149, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [64, 610.6, 48] },
  { name: "Quartz64B", price: 80, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [32, 54.4, 4.5] },
  { name: "Rock 5A", price: 170, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [64, 610.6, 48] },
  { name: "Tinker Board 2", price: 179, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [64, 95.2, 10.4] },
  { name: "UDOO BOLT V3", price: 437, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [192, 384.4, 4.004] },
  { name: "UDOO VISION X5", price: 349, spec: ["Shading Units", "GFLOP/s (32-bit)", "GPixel/s"], value: [96, 144, 1.5] },
];

export default {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "SBC GPU Specifications",
  autosize: {
    type: "fit-x",
    contains: "padding",
  },
  background: null,
  padding: 5,
  height: 350,

  title: {
    text: "Relative Specifications per Price",
    subtitle: "more is better",
    offset: 30,
  },

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
    },
  },

  legends: [
    {
      fill: "color",
      symbolType: "square",
      title: "Spec",
    },
  ],

  signals: [
    {
      name: "width",
      init: "isFinite(containerSize()[0]) ? containerSize()[0] : 200",
      on: [
        {
          update: "isFinite(containerSize()[0]) ? containerSize()[0] : 200",
          events: "window:resize",
        },
      ],
    },
  ],

  data: [
    {
      name: "table",
      values: SBCs,
    },
    {
      name: "data",
      source: "table",
      transform: [
        {
          type: "collect",
          sort: {
            field: "price",
            order: "descending",
          },
        },
        {
          type: "flatten",
          fields: ["spec", "value"],
        },
        {
          type: "formula",
          expr: "datum.value/datum.price",
          as: "perdollar",
        },
        {
          type: "joinaggregate",
          groupby: ["spec"],
          ops: ["max"],
          fields: ["perdollar"],
          as: ["perdollarmax"],
        },
        {
          type: "formula",
          expr: "datum.perdollar/datum.perdollarmax",
          as: "perdollarpercent",
        },
      ],
    },
  ],

  scales: [
    {
      name: "yscale",
      type: "band",
      domain: {
        data: "table",
        field: "name",
      },
      range: "height",
    },
    {
      name: "pricescale",
      type: "linear",
      domain: {
        data: "table",
        field: "price",
      },
      range: [0, { signal: "max(30, 0.1 * width)" }],
      round: true,
      zero: true,
      nice: true,
    },
    {
      name: "xscale",
      type: "linear",
      domain: {
        data: "data",
        field: "perdollarpercent",
      },
      range: [{ signal: "max(30, 0.1 * width) + 15" }, { signal: "width" }],
      round: true,
      zero: true,
      nice: true,
    },
    {
      name: "pricecolor",
      type: "linear",
      domain: {
        data: "table",
        field: "price",
      },
      range: {
        scheme: "goldred",
      },
    },
    {
      name: "color",
      type: "ordinal",
      domain: {
        data: "data",
        field: "spec",
      },
      range: {
        scheme: "category20c",
      },
    },
  ],

  axes: [
    {
      scale: "yscale",
      orient: "left",
      ticks: false,
      grid: true,
      gridDash: 5,
      bandPosition: -0.1,
      labelFontSize: 11,
      labelFontWeight: "bold",
      labelPadding: 10,
    },
    {
      scale: "pricescale",
      orient: "bottom",
      grid: true,
      labelOverlap: true,
      labelSeparation: 10,
      tickCount: 4,
      title: "$ Price",
      format: "$d",
    },
    {
      scale: "xscale",
      orient: "bottom",
      grid: true,
      labelOverlap: true,
      labelSeparation: 10,
      labelBound: true,
      tickMinStep: 0.1,
      title: "% of Spec / Price",
      format: "%",
    },
  ],

  marks: [
    {
      type: "rect",
      from: {
        data: "table",
      },
      encode: {
        enter: {
          y: {
            scale: "yscale",
            field: "name",
          },
          height: {
            scale: "yscale",
            band: 0.8,
          },
          x: {
            scale: "pricescale",
            field: "price",
          },
          x2: {
            scale: "pricescale",
            value: 0,
          },
          fill: {
            scale: "pricecolor",
            field: "price",
          },
        },
      },
    },

    {
      type: "group",

      from: {
        facet: {
          data: "data",
          name: "facet",
          groupby: "name",
        },
      },

      encode: {
        enter: {
          y: {
            scale: "yscale",
            field: "name",
          },
        },
      },

      scales: [
        {
          name: "spec",
          type: "band",
          range: "height",
          domain: {
            data: "facet",
            field: "spec",
          },
        },
      ],

      signals: [
        {
          name: "height",
          update: "0.8*bandwidth('yscale')",
        },
      ],

      marks: [
        {
          name: "bars",
          from: {
            data: "facet",
          },
          type: "rect",
          encode: {
            enter: {
              y: {
                scale: "spec",
                field: "spec",
              },
              height: {
                scale: "spec",
                band: 1,
              },
              x: {
                scale: "xscale",
                field: "perdollarpercent",
              },
              x2: {
                scale: "xscale",
                value: 0,
              },
              fill: {
                scale: "color",
                field: "spec",
              },
            },
          },
        },
        {
          type: "text",
          from: {
            data: "bars",
          },
          encode: {
            enter: {
              x: {
                field: "x2",
              },
              dx: [
                {
                  test: "datum.datum.perdollarpercent > 0.9",
                  value: -4,
                },
                {
                  value: 4,
                },
              ],
              y: {
                field: "y",
                // offset: {field: "height", mult: 0.5},
              },
              text: {
                field: "datum.value",
              },
              fill: [
                {
                  test: "datum.datum.perdollarpercent > 0.9 && contrast('white', datum.fill) > contrast('black', datum.fill)",
                  value: "white",
                },
                {
                  test: "datum.datum.perdollarpercent > 0.9",
                  value: "black",
                },
                {
                  value: "var(--color-text-emphasis)",
                },
              ],
              align: [
                {
                  test: "datum.datum.perdollarpercent > 0.9",
                  value: "right",
                },
                {
                  value: "left",
                },
              ],
              baseline: {
                value: "top",
              },
            },
          },
        },
      ],
    },
  ],
};
