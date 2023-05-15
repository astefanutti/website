const Benchmark = [
  { category: "Raspberry Pi 4", shader: "2d_cloud", fps: 0.98 },
  { category: "Jetson Nano", shader: "2d_cloud", fps: 11.9 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "2d_cloud", fps: 0.99 },
  { category: ["Jetson Nano", "(async)"], shader: "2d_cloud", fps: 12.8 },
  { category: "Raspberry Pi 4", shader: "animated_triangle_grid_wave", fps: 4.6 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "animated_triangle_grid_wave", fps: 4.88 },
  { category: "Jetson Nano", shader: "animated_triangle_grid_wave", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "animated_triangle_grid_wave", fps: 56.7 },
  { category: "Raspberry Pi 4", shader: "blobs", fps: 14.9 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "blobs", fps: 16.35 },
  { category: "Jetson Nano", shader: "blobs", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "blobs", fps: 77.8 },
  { category: "Raspberry Pi 4", shader: "bokeh_parallax", fps: 10.1 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "bokeh_parallax", fps: 12.11 },
  { category: "Jetson Nano", shader: "bokeh_parallax", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "bokeh_parallax", fps: 73.1 },
  { category: "Raspberry Pi 4", shader: "breathing_spirals", fps: 29.5 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "breathing_spirals", fps: 35.42 },
  { category: "Jetson Nano", shader: "breathing_spirals", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "breathing_spirals", fps: 81.2 },
  { category: "Raspberry Pi 4", shader: "clockwork_spacetime", fps: 15.3 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "clockwork_spacetime", fps: 20.88 },
  { category: "Jetson Nano", shader: "clockwork_spacetime", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "clockwork_spacetime", fps: 71.3 },
  { category: "Raspberry Pi 4", shader: "cloudy_crystal", fps: 0.44 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "cloudy_crystal", fps: 0.44 },
  { category: "Jetson Nano", shader: "cloudy_crystal", fps: 7.4 },
  { category: ["Jetson Nano", "(async)"], shader: "cloudy_crystal", fps: 7.8 },
  { category: "Raspberry Pi 4", shader: "complex_field_lines", fps: 14.98 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "complex_field_lines", fps: 17.88 },
  { category: "Jetson Nano", shader: "complex_field_lines", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "complex_field_lines", fps: 40.2 },
  { category: "Raspberry Pi 4", shader: "costal_landscape", fps: 2.39 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "costal_landscape", fps: 2.45 },
  { category: "Jetson Nano", shader: "costal_landscape", fps: 19.9 },
  { category: ["Jetson Nano", "(async)"], shader: "costal_landscape", fps: 27.3 },
  { category: "Raspberry Pi 4", shader: "creation_by_silexars", fps: 29.9 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "creation_by_silexars", fps: 46.6 },
  { category: "Jetson Nano", shader: "creation_by_silexars", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "creation_by_silexars", fps: 67.3 },
  { category: "Raspberry Pi 4", shader: "cross_galactic_ocean", fps: 0.32 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "cross_galactic_ocean", fps: 0.32 },
  { category: "Jetson Nano", shader: "cross_galactic_ocean", fps: 7.8 },
  { category: ["Jetson Nano", "(async)"], shader: "cross_galactic_ocean", fps: 8.8 },
  { category: "Raspberry Pi 4", shader: "cyber_fuji_2020", fps: 15.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "cyber_fuji_2020", fps: 18.8 },
  { category: "Jetson Nano", shader: "cyber_fuji_2020", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "cyber_fuji_2020", fps: 78.6 },
  { category: "Raspberry Pi 4", shader: "duality2", fps: 20.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "duality2", fps: 26.17 },
  { category: "Jetson Nano", shader: "duality2", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "duality2", fps: 71.2 },
  { category: "Raspberry Pi 4", shader: "extruded_truchet_pattern", fps: 1.26 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "extruded_truchet_pattern", fps: 1.28 },
  { category: "Jetson Nano", shader: "extruded_truchet_pattern", fps: 12.0 },
  { category: ["Jetson Nano", "(async)"], shader: "extruded_truchet_pattern", fps: 15.1 },
  { category: "Raspberry Pi 4", shader: "figure_eight_knot", fps: 0.12 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "figure_eight_knot", fps: 0.12 },
  { category: "Jetson Nano", shader: "figure_eight_knot", fps: 2.15 },
  { category: ["Jetson Nano", "(async)"], shader: "figure_eight_knot", fps: 2.16 },
  { category: "Raspberry Pi 4", shader: "flower_of_life_rgb", fps: 6.64 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "flower_of_life_rgb", fps: 7.17 },
  { category: "Jetson Nano", shader: "flower_of_life_rgb", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "flower_of_life_rgb", fps: 76.1 },
  { category: "Raspberry Pi 4", shader: "glossy_cubes", fps: 0.14 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "glossy_cubes", fps: 0.14 },
  { category: "Jetson Nano", shader: "glossy_cubes", fps: 2.6 },
  { category: ["Jetson Nano", "(async)"], shader: "glossy_cubes", fps: 2.67 },
  { category: "Raspberry Pi 4", shader: "grid_blend", fps: 20.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "grid_blend", fps: 27.02 },
  { category: "Jetson Nano", shader: "grid_blend", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "grid_blend", fps: 69.2 },
  { category: "Raspberry Pi 4", shader: "gyroidal_morphoma", fps: 0.38 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "gyroidal_morphoma", fps: 0.38 },
  { category: "Jetson Nano", shader: "gyroidal_morphoma", fps: 7.5 },
  { category: ["Jetson Nano", "(async)"], shader: "gyroidal_morphoma", fps: 8.4 },
  { category: "Raspberry Pi 4", shader: "hexagon_triangle_wedge_pattern", fps: 5.9 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "hexagon_triangle_wedge_pattern", fps: 6.37 },
  { category: "Jetson Nano", shader: "hexagon_triangle_wedge_pattern", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "hexagon_triangle_wedge_pattern", fps: 35.0 },
  { category: "Raspberry Pi 4", shader: "hexagonal_maze_flow", fps: 8.6 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "hexagonal_maze_flow", fps: 10.3 },
  { category: "Jetson Nano", shader: "hexagonal_maze_flow", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "hexagonal_maze_flow", fps: 68.6 },
  { category: "Raspberry Pi 4", shader: "hilbert_curve_animation", fps: 2.84 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "hilbert_curve_animation", fps: 2.89 },
  { category: "Jetson Nano", shader: "hilbert_curve_animation", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "hilbert_curve_animation", fps: 41.6 },
  { category: "Raspberry Pi 4", shader: "hyperbolic_poincare_weave", fps: 1.33 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "hyperbolic_poincare_weave", fps: 1.36 },
  { category: "Jetson Nano", shader: "hyperbolic_poincare_weave", fps: 15.0 },
  { category: ["Jetson Nano", "(async)"], shader: "hyperbolic_poincare_weave", fps: 16.2 },
  { category: "Raspberry Pi 4", shader: "infinite_gamecube", fps: 3.52 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "infinite_gamecube", fps: 3.68 },
  { category: "Jetson Nano", shader: "infinite_gamecube", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "infinite_gamecube", fps: 41.9 },
  { category: "Raspberry Pi 4", shader: "linear_to_hilbert", fps: 20.1 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "linear_to_hilbert", fps: 28.7 },
  { category: "Jetson Nano", shader: "linear_to_hilbert", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "linear_to_hilbert", fps: 81.4 },
  { category: "Raspberry Pi 4", shader: "lonely_waters", fps: 0.59 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "lonely_waters", fps: 0.60 },
  { category: "Jetson Nano", shader: "lonely_waters", fps: 13.5 },
  { category: ["Jetson Nano", "(async)"], shader: "lonely_waters", fps: 15.5 },
  { category: "Raspberry Pi 4", shader: "maze_lattice", fps: 0.78 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "maze_lattice", fps: 0.78 },
  { category: "Jetson Nano", shader: "maze_lattice", fps: 7.6 },
  { category: ["Jetson Nano", "(async)"], shader: "maze_lattice", fps: 8.4 },
  { category: "Raspberry Pi 4", shader: "menger_sponge_tunnel", fps: 3.38 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "menger_sponge_tunnel", fps: 3.45 },
  { category: "Jetson Nano", shader: "menger_sponge_tunnel", fps: 19.9 },
  { category: ["Jetson Nano", "(async)"], shader: "menger_sponge_tunnel", fps: 25.3 },
  { category: "Raspberry Pi 4", shader: "nautilus_shell", fps: 0.25 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "nautilus_shell", fps: 0.25 },
  { category: "Jetson Nano", shader: "nautilus_shell", fps: 3.1 },
  { category: ["Jetson Nano", "(async)"], shader: "nautilus_shell", fps: 3.2 },
  { category: "Raspberry Pi 4", shader: "odd_structures", fps: 2.22 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "odd_structures", fps: 2.27 },
  { category: "Jetson Nano", shader: "odd_structures", fps: 15.0 },
  { category: ["Jetson Nano", "(async)"], shader: "odd_structures", fps: 19.4 },
  { category: "Raspberry Pi 4", shader: "oklab_based_tonemapper", fps: 15.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "oklab_based_tonemapper", fps: 19.79 },
  { category: "Jetson Nano", shader: "oklab_based_tonemapper", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "oklab_based_tonemapper", fps: 67.8 },
  { category: "Raspberry Pi 4", shader: "old_skool_3d_driving", fps: 30.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "old_skool_3d_driving", fps: 64.36 },
  { category: "Jetson Nano", shader: "old_skool_3d_driving", fps: 30.0 },
  { category: ["Jetson Nano", "(async)"], shader: "old_skool_3d_driving", fps: 93.6 },
  { category: "Raspberry Pi 4", shader: "orbital_2d", fps: 1.61 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "orbital_2d", fps: 1.65 },
  { category: "Jetson Nano", shader: "orbital_2d", fps: 19.9 },
  { category: ["Jetson Nano", "(async)"], shader: "orbital_2d", fps: 21.9 },
  { category: "Raspberry Pi 4", shader: "planetary_gears", fps: 1.56 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "planetary_gears", fps: 1.58 },
  { category: "Jetson Nano", shader: "planetary_gears", fps: 12.2 },
  { category: ["Jetson Nano", "(async)"], shader: "planetary_gears", fps: 15.6 },
  { category: "Raspberry Pi 4", shader: "quasi_infinite_zoom_voronoi", fps: 0.74 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "quasi_infinite_zoom_voronoi", fps: 0.75 },
  { category: "Jetson Nano", shader: "quasi_infinite_zoom_voronoi", fps: 12.0 },
  { category: ["Jetson Nano", "(async)"], shader: "quasi_infinite_zoom_voronoi", fps: 14.27 },
  { category: "Raspberry Pi 4", shader: "rainbow_smith_cells", fps: 6.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "rainbow_smith_cells", fps: 6.65 },
  { category: "Jetson Nano", shader: "rainbow_smith_cells", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "rainbow_smith_cells", fps: 59.9 },
  { category: "Raspberry Pi 4", shader: "ring_twister", fps: 9.72 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "ring_twister", fps: 10.4 },
  { category: "Jetson Nano", shader: "ring_twister", fps: 30.0 },
  { category: ["Jetson Nano", "(async)"], shader: "ring_twister", fps: 63.5 },
  { category: "Raspberry Pi 4", shader: "saturday_torus", fps: 8.56 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "saturday_torus", fps: 9.27 },
  { category: "Jetson Nano", shader: "saturday_torus", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "saturday_torus", fps: 67.5 },
  { category: "Raspberry Pi 4", shader: "simplex_truchet_weave", fps: 6.66 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "simplex_truchet_weave", fps: 7.4 },
  { category: "Jetson Nano", shader: "simplex_truchet_weave", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "simplex_truchet_weave", fps: 61.9 },
  { category: "Raspberry Pi 4", shader: "smooth_contours", fps: 19.9 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "smooth_contours", fps: 29.4 },
  { category: "Jetson Nano", shader: "smooth_contours", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "smooth_contours", fps: 93.8 },
  { category: "Raspberry Pi 4", shader: "square_truchet_flow", fps: 14.96 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "square_truchet_flow", fps: 16.73 },
  { category: "Jetson Nano", shader: "square_truchet_flow", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "square_truchet_flow", fps: 73.4 },
  { category: "Raspberry Pi 4", shader: "stars_and_galaxy", fps: 2.5 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "stars_and_galaxy", fps: 2.59 },
  { category: "Jetson Nano", shader: "stars_and_galaxy", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "stars_and_galaxy", fps: 33.8 },
  { category: "Raspberry Pi 4", shader: "stripey_torus_interior", fps: 2.62 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "stripey_torus_interior", fps: 2.72 },
  { category: "Jetson Nano", shader: "stripey_torus_interior", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "stripey_torus_interior", fps: 45.3 },
  { category: "Raspberry Pi 4", shader: "subdivided_grid_truchet_parttern", fps: 15.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "subdivided_grid_truchet_parttern", fps: 18.78 },
  { category: "Jetson Nano", shader: "subdivided_grid_truchet_parttern", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "subdivided_grid_truchet_parttern", fps: 76.7 },
  { category: "Raspberry Pi 4", shader: "surveillance_mosaic", fps: 2.71 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "surveillance_mosaic", fps: 2.78 },
  { category: "Jetson Nano", shader: "surveillance_mosaic", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "surveillance_mosaic", fps: 41.3 },
  { category: "Raspberry Pi 4", shader: "synthwave_road", fps: 29.9 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "synthwave_road", fps: 38.5 },
  { category: "Jetson Nano", shader: "synthwave_road", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "synthwave_road", fps: 68.2 },
  { category: "Raspberry Pi 4", shader: "the_inversion_machine", fps: 2.33 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "the_inversion_machine", fps: 2.38 },
  { category: "Jetson Nano", shader: "the_inversion_machine", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "the_inversion_machine", fps: 33.0 },
  { category: "Raspberry Pi 4", shader: "the_secret_place", fps: 4.0 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "the_secret_place", fps: 4.12 },
  { category: "Jetson Nano", shader: "the_secret_place", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "the_secret_place", fps: 37.2 },
  { category: "Raspberry Pi 4", shader: "tilings", fps: 11.97 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "tilings", fps: 13.42 },
  { category: "Jetson Nano", shader: "tilings", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "tilings", fps: 63.2 },
  { category: "Raspberry Pi 4", shader: "torus_loop", fps: 3.45 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "torus_loop", fps: 3.6 },
  { category: "Jetson Nano", shader: "torus_loop", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "torus_loop", fps: 42.8 },
  { category: "Raspberry Pi 4", shader: "traced_minkowski_tube", fps: 5.97 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "traced_minkowski_tube", fps: 6.4 },
  { category: "Jetson Nano", shader: "traced_minkowski_tube", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "traced_minkowski_tube", fps: 52.3 },
  { category: "Raspberry Pi 4", shader: "triangle_grid_contouring", fps: 2.6 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "triangle_grid_contouring", fps: 2.67 },
  { category: "Jetson Nano", shader: "triangle_grid_contouring", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "triangle_grid_contouring", fps: 36.5 },
  { category: "Raspberry Pi 4", shader: "truchet_kaleidoscope", fps: 3.02 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "truchet_kaleidoscope", fps: 3.1 },
  { category: "Jetson Nano", shader: "truchet_kaleidoscope", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "truchet_kaleidoscope", fps: 48.2 },
  { category: "Raspberry Pi 4", shader: "truchet_trip", fps: 1.48 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "truchet_trip", fps: 1.5 },
  { category: "Jetson Nano", shader: "truchet_trip", fps: 15.0 },
  { category: ["Jetson Nano", "(async)"], shader: "truchet_trip", fps: 16.9 },
  { category: "Raspberry Pi 4", shader: "universe_within_314", fps: 0.84 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "universe_within_314", fps: 0.84 },
  { category: "Jetson Nano", shader: "universe_within_314", fps: 15.0 },
  { category: ["Jetson Nano", "(async)"], shader: "universe_within_314", fps: 16.4 },
  { category: "Raspberry Pi 4", shader: "viscosity", fps: 2.48 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "viscosity", fps: 2.5 },
  { category: "Jetson Nano", shader: "viscosity", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "viscosity", fps: 37.6 },
  { category: "Raspberry Pi 4", shader: "warping_boxes", fps: 14.96 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "warping_boxes", fps: 17.5 },
  { category: "Jetson Nano", shader: "warping_boxes", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "warping_boxes", fps: 64.6 },
  { category: "Raspberry Pi 4", shader: "weaving_bridges", fps: 11.8 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "weaving_bridges", fps: 12.85 },
  { category: "Jetson Nano", shader: "weaving_bridges", fps: 29.9 },
  { category: ["Jetson Nano", "(async)"], shader: "weaving_bridges", fps: 62.7 },
  { category: "Raspberry Pi 4", shader: "white_drops", fps: 0.73 },
  { category: ["Raspberry Pi 4", "(async)"], shader: "white_drops", fps: 0.73 },
  { category: "Jetson Nano", shader: "white_drops", fps: 8.5 },
  { category: ["Jetson Nano", "(async)"], shader: "white_drops", fps: 9.8 },
];

export default {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "Benchmark",
  autosize: {
    type: "fit-x",
    contains: "padding",
  },
  background: null,
  padding: 5,
  // height: 450,

  title: {
    text: "Distribution of Shadersᐩ FPS at Full HD Resolution",
    subtitle: "more is better",
    offset: 20,
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
      fontSize: 11,
    },
    view: {
      stroke: null,
    },
  },

  data: [
    {
      name: "data",
      values: Benchmark,
    },
    {
      name: "density",
      source: "data",
      transform: [
        {
          type: "kde",
          field: "fps",
          groupby: ["category"],
          // "bandwidth": { "signal": "bandwidth" },
          bandwidth: 2,
          // extent: [0, 100],
        },
      ],
    },
    {
      name: "stats",
      source: "data",
      transform: [
        {
          type: "aggregate",
          groupby: ["category"],
          fields: ["fps", "fps", "fps"],
          ops: ["q1", "median", "q3"],
          as: ["q1", "median", "q3"],
        },
      ],
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
    {
      name: "plotWidth",
      value: 200,
    },
    {
      name: "height",
      update: "(plotWidth) * 2.6",
    },
  ],

  scales: [
    {
      name: "layout",
      type: "band",
      range: "height",
      domain: {
        data: "data",
        field: "category",
      },
    },
    {
      name: "xscale",
      type: "linear",
      range: [0, { signal: "width" }],
      domain: {
        data: "density",
        field: "value",
      },
      round: true,
      zero: true,
      nice: true,
    },
    {
      name: "hscale",
      type: "linear",
      range: [0, { signal: "plotWidth" }],
      domain: {
        data: "density",
        field: "density",
      },
    },
    {
      name: "color",
      type: "ordinal",
      domain: {
        data: "data",
        field: "category",
      },
      range: ["#e91e63", "#76b900", "#e91e63", "#76b900"],
    },
    {
      name: "pattern",
      type: "ordinal",
      domain: {
        data: "data",
        field: "category",
      },
      range: ["url(#raspberry)", "url(#nvidia)", "url(#raspberry)", "url(#nvidia)"],
    },
    {
      name: "legend",
      type: "ordinal",
      domain: ["Median", "[25%,75%]"],
      range: ["diamond", "M -1 -1 C -0.346 -1.317 -0.102 -0.332 0.804 -0.447 C 1.267 -0.502 1.169 -1.516 1.995 -1.52 V 1.511 L -0.999 1.508 Z"],
    }
  ],

  axes: [
    {
      scale: "xscale",
      orient: "bottom",
      grid: true,
      labelOverlap: true,
      labelSeparation: 10,
      labelBound: true,
      tickMinStep: 0.1,
      title: "FPS",
      // zindex: 1,
    },
    {
      scale: "layout",
      orient: "left",
      // tickCount: 5,
      ticks: false,
      grid: true,
      gridDash: 5,
      // bandPosition: 0.5,
      labelFontSize: 11,
      labelFontWeight: "bold",
      labelPadding: 10,
      // zindex: 1,
    },
  ],

  legends: [
    {
      type: "symbol",
      shape: "legend",
      orient: "top-right",
      direction: "horizontal",
      labelFontSize: 14,
      labelBaseline: "top",
      labelOffset: 15,
      symbolSize: 300,
      symbolStrokeWidth: 1,
      symbolDashOffset: 1,
      columnPadding: 20,
      encode: {
        symbols: {
          enter: {
            fill: [
              {
                test: "datum.value === 'Median'",
                value: "var(--color-text-emphasis)",
              },
              {
                value: "url(#diagonal-stripe-1)",
              },
            ],
            fillOpacity: [
              {
                test: "datum.value === 'Median'",
                value: null,
              },
              {
                value: 0.5,
              },
            ],
            stroke: [
              {
                test: "datum.value === 'Median'",
                value: null,
              },
              {
                value: "var(--color-text-emphasis)",
              },
            ],
            strokeDash: [
              {
                test: "datum.value === 'Median'",
                value: null,
              },
              {
                value: [7, 3],
              },
            ],
            strokeOpacity: [
              {
                test: "datum.value === 'Median'",
                value: null,
              },
              {
                value: 0.8,
              },
            ],
          },
        },
      },
    },
  ],

  marks: [
    {
      type: "group",
      from: {
        facet: {
          data: "density",
          name: "violin",
          groupby: "category",
        },
      },

      data: [
        {
          name: "summary",
          source: "stats",
          transform: [
            {
              type: "filter",
              expr: "datum.category === parent.category",
            },
          ],
        },
        {
          name: "quartiles",
          source: "violin",
          transform: [
            {
              type: "lookup",
              from: "summary",
              key: "category",
              fields: ["category"],
              as: ["obj"],
            },
            {
              type: "filter",
              expr: "datum.value >= datum.obj.q1 && datum.value <= datum.obj.q3",
            },
          ],
        },
      ],

      encode: {
        enter: {
          yc: {
            scale: "layout",
            field: "category",
            band: 0.5,
          },
          height: {
            signal: "plotWidth",
          },
          width: {
            signal: "width",
          },
        },
      },

      marks: [
        {
          type: "area",
          from: {
            data: "violin",
          },
          encode: {
            enter: {
              interpolate: {
                value: "catmull-rom",
              },
              fill: {
                scale: "color",
                field: {
                  parent: "category",
                },
              },
            },
            update: {
              x: {
                scale: "xscale",
                field: "value",
              },
              yc: {
                signal: "plotWidth / 2",
              },
              height: {
                scale: "hscale",
                field: "density",
              },
            },
          },
        },
        {
          type: "area",
          from: {
            data: "violin",
          },
          encode: {
            enter: {
              interpolate: {
                value: "catmull-rom",
              },
              fill: {
                scale: "pattern",
                field: {
                  parent: "category",
                },
              },
              fillOpacity: {
                value: 1.0,
              },
            },
            update: {
              x: {
                scale: "xscale",
                field: "value",
              },
              yc: {
                signal: "plotWidth / 2",
              },
              height: {
                scale: "hscale",
                field: "density",
              },
            },
          },
        },
        {
          type: "area",
          from: {
            data: "quartiles",
          },
          encode: {
            enter: {
              interpolate: {
                value: "catmull-rom",
              },
              stroke: {
                value: "var(--color-text-emphasis)",
              },
              strokeWidth: {
                value: 1,
              },
              strokeOpacity: {
                value: 0.5,
              },
              strokeDash: {
                value: [10, 5],
              },
              strokeJoin: {
                value: "round",
              },
              fill: {
                value: "url(#diagonal-stripe-1)",
              },
              fillOpacity: {
                value: 0.25,
              },
            },
            update: {
              x: {
                scale: "xscale",
                field: "value",
              },
              yc: {
                signal: "plotWidth / 2",
              },
              height: {
                scale: "hscale",
                field: "density",
              },
            },
          },
        },
        {
          type: "symbol",
          from: {
            data: "summary",
          },
          encode: {
            enter: {
              fill: {
                value: "var(--color-text-emphasis)",
              },
              size: {
                value: 140,
              },
              shape: {
                value: "diamond",
              },
            },
            update: {
              x: {
                scale: "xscale",
                field: "median",
              },
              yc: {
                signal: "plotWidth / 2",
              },
            },
          },
        },
        {
          type: "text",
          from: {
            data: "summary",
          },
          encode: {
            enter: {
              fill: {
                value: "var(--color-text-emphasis)",
              },
              text: {
                field: "median",
              },
              fontSize: {
                value: 14,
              },
              fontWeight: {
                value: "bold",
              },
              align: [
                {
                  test: "datum.median < 10",
                  value: "center",
                },
                {
                  value: "center",
                },
              ],
              baseline: {
                value: "bottom",
              },
            },
            update: {
              x: {
                scale: "xscale",
                field: "median",
              },
              y: {
                signal: "plotWidth / 2",
              },
              dy: {
                value: -5,
              },
            },
          },
        },
      ],
    },
  ],
};
