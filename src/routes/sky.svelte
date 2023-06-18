<script lang="ts">
  import { BackSide, UniformsUtils } from 'three'

  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  // import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
  import { Sky } from 'three/addons/objects/Sky.js'
  import { MathUtils, Vector3 } from 'three'

  // export let width: number, height: number
  export let elevation: number = 0
  export let azimuth: number = 180

  const { invalidate, renderer, camera } = useThrelte()

  renderer.toneMappingExposure = 0.5

  let uniforms = UniformsUtils.clone(Sky.SkyShader.uniforms)

  uniforms.turbidity.value = 20
  uniforms.rayleigh.value = 4
  uniforms.mieCoefficient.value = 0.1
  uniforms.mieDirectionalG.value = 0

  $: {
    const phi = MathUtils.degToRad(90 - elevation)
    const theta = MathUtils.degToRad(azimuth)
    let sun = new Vector3()
    sun.setFromSphericalCoords(1, phi, theta)
    uniforms.sunPosition.value.copy(sun)
    invalidate()
  }
</script>

<!-- <svelte:window on:resize={onWindowResize} /> -->

<T.PerspectiveCamera
  makeDefault
  fov={60}
  near={100}
  far={2000000}
  position={[0, 10, 2000]}
  rotation={[0.1, 0, 0]}
  zoom={3}
>
  <!-- <OrbitControls enableZoom={false} enablePan={false} /> -->
</T.PerspectiveCamera>
<T.Mesh scale={450000}>
  <T.ShaderMaterial
    name="SkyShader"
    side={BackSide}
    depthWrite={false}
    fragmentShader={Sky.SkyShader.fragmentShader}
    vertexShader={Sky.SkyShader.vertexShader}
    {uniforms}
  />
  <T.BoxGeometry args={[1, 1, 1]} />
</T.Mesh>
