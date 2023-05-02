const pad = 'rgba(220, 220, 220, 0.8)';

const average_pad = 'rgba(44, 160, 44, 0.8)';
const average_link = 'rgba(44, 160, 44, 0.4)';

const stress_pad = 'rgba(255, 127, 14, 0.8)';
const stress_link = 'rgba(255, 127, 14, 0.4)';

export default {
  config: {
    displayModeBar: false,
    showTips: false,
    responsive: true,
  },
  layout: {
    margin: { t: 0, r: 0, l: 0, b: 0 },
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
  },
  data: [{
    type: 'sankey',
    arrangement: 'snap',
    domain: {
      x: [0, 1],
      y: [0, 1],
    },
    orientation: 'h',
    valueformat: '.0f',
    valuesuffix: 'W',
    node: {
      pad: 15,
      thickness: 15,
      line: {
        color: 'black',
        width: 0.5,
      },
      label: ['Power', 'Average', 'Stress', 'Display', 'Switch', '2x SSD', '5x RPi', '2x RPi4', '3x RPi3'],
      color: [pad, average_pad, stress_pad, pad, pad, pad, pad, pad, pad],
    },
    link: {
      source: [0, 0, 1, 1, 1, 1, 2, 2, 6, 6, 6, 6],
      target: [1, 2, 3, 4, 5, 6, 5, 6, 7, 8, 7, 8],
      value: [22.3, 24.7, 2.7, 3.6, 1.6, 14.5, 10, 14.7, 7.2, 7.3, 7.1, 7.6],
      color: [
        average_link,
        stress_link,
        average_link,
        average_link,
        average_link,
        average_link,
        stress_link,
        stress_link,
        average_link,
        average_link,
        stress_link,
        stress_link,
      ],
    }
  }]
}
