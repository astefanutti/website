const stress = "#ff7f0e";
const average = "#2ca02c";

const data = [
  { "category": "Power", "stack": 1, "sort": 1, "labels": "left" },

  { "category": "Average", "stack": 2, "sort": 1, labels: "left" },
  { "category": "Stress", "stack": 2, "sort": 2, labels: "left" },

  { "category": "Display", "stack": 3, sort: 1 },
  { "category": "Switch", "stack": 3, sort: 2 },
  { "category": "2x SSD", "stack": 3, sort: 3 },
  { "category": "5x RPi", "stack": 3, sort: 4 },

  { "category": "3x RPi3", "stack": 4, "sort": 1, "gap": 80 },
  { "category": "2x RPi4", "stack": 4, "sort": 2, "gap": 10 },

  { "source": "Power", "destination": "Stress", "value": 25, color: stress },
  { "source": "Power", "destination": "Average", "value": 24, color: average },

  { "source": "Average", "destination": "5x RPi", "value": 15, color: average },
  { "source": "Average", "destination": "2x SSD", "value": 2, color: average },
  { "source": "Average", "destination": "Switch", "value": 4, color: average },
  { "source": "Average", "destination": "Display", "value": 3, color: average },

  { "source": "Stress", "destination": "5x RPi", "value": 15, color: stress },
  { "source": "Stress", "destination": "2x SSD", "value": 10, color: stress },

  { "source": "5x RPi", "destination": "2x RPi4", "value": 7, color: stress },
  { "source": "5x RPi", "destination": "3x RPi3", "value": 8, color: stress },
  { "source": "5x RPi", "destination": "2x RPi4", "value": 8, color: average },
  { "source": "5x RPi", "destination": "3x RPi3", "value": 7, color: average },
];

export default {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "Electrical Power Distribution",
  autosize: {
    type: "fit-x",
    contains: "padding",
  },
  background: null,
  padding: 5,

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
    {
      name: "height",
      init: "isFinite(containerSize()[0]) ? containerSize()[0]/1.8 : 400",
      on: [
        {
          update: "isFinite(containerSize()[0]) ? containerSize()[0]/1.8 : 400",
          events: "window:resize",
        },
      ],
    },
    {
      name: "standardGap",
      value: 14,
      description: "Gap as a percentage of full domain",
    },
    {
      name: "base",
      value: "center",
      description: "How to stack (center or zero)"
    }
  ],

  data: [
    {
      name: "input",
      values: data,
    },
    {
      name: "stacks",
      source: "input",
      transform: [
        { type: "filter", expr: "datum.source != null" },
        { type: "formula", as: "end", expr: "['source','destination']" },
        { type: "formula", as: "name", expr: "[datum.source,datum.destination]" },
        { type: "project", fields: ["end", "name", "value"] },
        { type: "flatten", fields: ["end", "name"] },
        {
          type: "lookup",
          from: "input",
          key: "category",
          values: ["stack", "sort", "gap", "labels"],
          fields: ["name"],
          as: ["stack", "sort", "gap", "labels"],
        },
        {
          type: "aggregate",
          fields: ["value", "stack", "sort", "gap", "labels"],
          groupby: ["end", "name"],
          ops: ["sum", "max", "max", "max", "max"],
          as: ["value", "stack", "sort", "gap", "labels"],
        },
        {
          type: "aggregate",
          fields: ["value", "stack", "sort", "gap", "labels"],
          groupby: ["name"],
          ops: ["max", "max", "max", "max", "max"],
          as: ["value", "stack", "sort", "gap", "labels"],
        },
        { type: "formula", as: "gap", expr: "datum.gap?datum.gap:0" },
      ],
    },
    {
      name: "maxValue",
      source: ["stacks"],
      transform: [
        {
          type: "aggregate",
          fields: ["value"],
          groupby: ["stack"],
          ops: ["sum"],
          as: ["value"],
        },
        {
          type: "aggregate",
          fields: ["value"],
          ops: ["max"],
          as: ["value"],
        },
      ],
    },
    {
      name: "plottedStacks",
      source: ["stacks"],
      transform: [
        { type: "formula", as: "spacer", expr: "(data('maxValue')[0].value/100)*(standardGap+datum.gap)" },
        { type: "formula", as: "type", expr: "['data','spacer']" },
        { type: "formula", as: "spacedValue", expr: "[datum.value,datum.spacer]" },
        { type: "flatten", fields: ["type", "spacedValue"] },
        {
          type: "stack",
          groupby: ["stack"],
          sort: { "field": "sort", "order": "descending" },
          field: "spacedValue",
          offset: { signal: "base" },
        },
        { type: "formula", expr: "((datum.value)/2)+datum.y0", as: "yc" },
      ],
    },
    {
      name: "finalTable",
      source: ["plottedStacks"],
      transform: [
        { type: "filter", expr: "datum.type == 'data'" },
      ],
    },
    {
      name: "linkTable",
      source: ["input"],
      transform: [
        { type: "filter", expr: "datum.source != null" },
        {
          type: "lookup",
          from: "finalTable",
          key: "name",
          values: ["y0", "y1", "stack", "sort"],
          fields: ["source"],
          as: ["sourceStacky0", "sourceStacky1", "sourceStack", "sourceSort"],
        },
        {
          type: "lookup",
          from: "finalTable",
          key: "name",
          values: ["y0", "y1", "stack", "sort"],
          fields: ["destination"],
          as: [
            "destinationStacky0",
            "destinationStacky1",
            "destinationStack",
            "destinationSort",
          ],
        },
        {
          type: "stack",
          groupby: ["source"],
          // sort: { field: "destinationSort", order: "descending" },
          field: "value",
          offset: "zero",
          as: ["syi0", "syi1"],
        },
        { type: "formula", expr: "datum.syi0+datum.sourceStacky0", as: "sy0" },
        { type: "formula", expr: "datum.sy0+datum.value", as: "sy1" },
        {
          type: "stack",
          groupby: ["destination"],
          sort: { "field": "sourceSort", "order": "descending" },
          field: "value",
          offset: "zero",
          as: ["dyi0", "dyi1"],
        },
        { type: "formula", expr: "datum.dyi0+datum.destinationStacky0", as: "dy0" },
        { type: "formula", expr: "datum.dy0+datum.value", as: "dy1" },
        { type: "formula", expr: "((datum.value)/2)+datum.sy0", as: "syc" },
        { type: "formula", expr: "((datum.value)/2)+datum.dy0", as: "dyc" },
        {
          type: "linkpath",
          orient: "horizontal",
          shape: "diagonal",
          sourceY: { expr: "scale('y', datum.syc)" },
          // sourceX: { expr: "scale('x', toNumber(datum.sourceStack))+bandwidth('x')" },
          sourceX: { expr: "scale('x', toNumber(datum.sourceStack))+15" },
          targetY: { expr: "scale('y', datum.dyc)" },
          targetX: { expr: "scale('x', datum.destinationStack)" },
        },
        { type: "formula", expr: "abs(range('y')[0]-scale('y', datum.value))", as: "strokeWidth" },
      ],
    },
  ],

  scales: [
    {
      name: "x",
      type: "band",
      range: "width",
      domain: { data: "finalTable", field: "stack" },
      paddingInner: 0.9,
    },
    {
      name: "y",
      type: "linear",
      range: "height",
      domain: { data: "finalTable", field: "y1" },
      reverse: true,
    },
  ],

  marks: [
    {
      type: "rect",
      from: { data: "finalTable" },
      encode: {
        update: {
          x: { scale: "x", field: "stack" },
          // width: { scale: "x", band: 1 },
          width: { value: "15" },
          y: { scale: "y", field: "y0" },
          y2: { scale: "y", field: "y1" },
          fill: { value: "#dcdcdc" },
          fillOpacity: { value: 0.8 },
          strokeWidth: { value: 0.5 },
          stroke: { value: "var(--color-text-emphasis)" },
        },
      },
    },
    {
      type: "path",
      name: "links",
      from: { data: "linkTable" },
      clip: true,
      encode: {
        update: {
          strokeWidth: { field: "strokeWidth" },
          path: { field: "path" },
          strokeOpacity: { value: "0.4" },
          stroke: { field: "color" },
        },
      },
    },
    {
      type: "group",
      name: "labelText",
      zindex: 1,
      from: {
        facet: {
          data: "finalTable",
          name: "labelFacet",
          groupby: ["name", "stack", "yc", "value", "labels"],
        },
      },
      clip: false,
      encode: {
        update: {
          strokeWidth: { value: 1 },
          x: {
            // signal: "datum.labels=='left'?scale('x', datum.stack)-8 : scale('x', datum.stack) + (bandwidth('x')) +8",
            signal: "datum.labels=='left'?scale('x', datum.stack)-8 : scale('x', datum.stack) + 15 +8"
          },
          yc: { "scale": "y", "signal": "datum.yc" },
        },
      },
      marks: [
        {
          type: "text",
          name: "heading",
          from: { data: "labelFacet" },
          encode: {
            update: {
              x: { value: 0 },
              y: { value: -2 },
              text: { field: "name" },
              align: { signal: "datum.labels=='left'?'right':'left'" },
              fontWeight: { value: "bold" },
              fontSize: { value: 13 },
              fill: { value: "var(--color-text-primary)" },
            }
          }
        },
        {
          type: "text",
          name: "amount",
          from: { data: "labelFacet" },
          encode: {
            update: {
              x: { value: 0 },
              y: { value: 12 },
              text: { signal: "datum.value + 'W'" },
              align: { signal: "datum.labels=='left'?'right':'left'" },
              fontSize: { value: 12 },
              fill: { value: "var(--color-text-primary)" },
            },
          },
        },
      ],
    },
    {
      type: "rect",
      from: { data: "labelText" },
      encode: {
        update: {
          x: { field: "bounds.x1", offset: -2 },
          x2: { field: "bounds.x2", offset: 2 },
          y: { field: "bounds.y1", offset: -2 },
          y2: { field: "bounds.y2", offset: 2 },
          fill: { value: "var(--color-background-code)" },
          opacity: { value: 0.75 },
          cornerRadius: { value: 4 },
        },
      },
    },
  ],
}
