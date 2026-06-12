<script lang="ts">
  import { BackSide, TextureLoader, SRGBColorSpace, HalfFloatType } from 'three'
  import { T, useThrelte, useTask } from '@threlte/core'
  import { MathUtils, Vector3 } from 'three'
  import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, ToneMappingMode } from 'postprocessing'
  import { SkyMoonShader, SkyDefaults, ToneMappings } from '$lib/shaders/sky-shader'
  import themeStore from '$lib/theme/index'
  import { page } from '$app/stores'

  const debug = $derived($page.url.searchParams.has('debug'))

  const { invalidate, renderer, scene, camera, size, autoRender, renderStage, shouldRender } = useThrelte()

  // Tone mapping + exposure handled by the postprocessing pipeline, not the renderer
  // Take over rendering to insert bloom + tone mapping passes
  autoRender.set(false)

  let composer: EffectComposer | undefined
  let bloomEffect: BloomEffect | undefined
  let toneMappingEffect: ToneMappingEffect | undefined

  $effect(() => {
    const c = new EffectComposer(renderer, { frameBufferType: HalfFloatType })
    c.addPass(new RenderPass(scene, camera.current))

    // mipmapBlur produces round, soft bloom regardless of resolution
    bloomEffect = new BloomEffect({
      mipmapBlur: true,
      intensity: SkyDefaults.bloomStrength,
      radius: SkyDefaults.bloomRadius,
      luminanceThreshold: SkyDefaults.bloomThreshold,
      luminanceSmoothing: 0.3,
    })
    toneMappingEffect = new ToneMappingEffect({ mode: ToneMappings[SkyDefaults.toneMapping] as ToneMappingMode })
    c.addPass(new EffectPass(camera.current, bloomEffect, toneMappingEffect))

    composer = c
    invalidate()
    return () => {
      c.dispose()
      composer = undefined
    }
  })

  // Keep composer sized to the canvas
  $effect(() => {
    composer?.setSize(size.current.width, size.current.height)
    invalidate()
  })

  // Render via the composer, respecting on-demand rendering (idle = no work).
  // Exposure is computed directly from elevation in updateAll, so no extra
  // frames are needed beyond the transition itself.
  useTask(
    (delta) => {
      if (composer && shouldRender()) composer.render(delta)
    },
    { stage: renderStage, autoInvalidate: false },
  )

  const uniforms = SkyMoonShader.uniforms

  const loader = new TextureLoader()
  loader.load('/moon-albedo.jpg', (texture) => {
    texture.colorSpace = SRGBColorSpace
    uniforms.moonAlbedoMap.value = texture
    invalidate()
  })

  // Moon phase — advances one lunar day per dark mode toggle
  const LUNAR_CYCLE = 29.53
  let moonPhaseValue = uniforms.moonPhase.value

  let dataTheme = $state(document.documentElement.getAttribute('data-theme') ?? 'light')
  let isDark = $derived(dataTheme === 'dark')
  let prevDark = isDark

  let elevation = isDark ? SkyDefaults.sunElevationNight : SkyDefaults.sunElevationDay
  let targetElevation = $derived(isDark ? SkyDefaults.sunElevationNight : SkyDefaults.sunElevationDay)

  $effect(() => {
    const observer = new MutationObserver(() => {
      dataTheme = document.documentElement.getAttribute('data-theme') ?? 'light'
      if (themeFromSlider) {
        themeFromSlider = false
      } else {
        elevation = params.sunElevation
        debugOverride = false
      }

      // Advance moon phase when entering dark mode
      if (isDark && !prevDark) {
        // Always progress forward — wrap around, skipping invisible new moon
        moonPhaseValue = moonPhaseValue - 3 / LUNAR_CYCLE
        if (moonPhaseValue < 0.12) moonPhaseValue = 0.88
        uniforms.moonPhase.value = moonPhaseValue
        params.moonPhase = moonPhaseValue
        if (guiRef) guiRef.controllersRecursive().forEach(c => c.updateDisplay())
      }
      prevDark = isDark
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  })

  // Debug params — lil-gui drives these, updateAll syncs to shader
  const params = {
    sunElevation: elevation,
    sunAzimuth: SkyDefaults.sunAzimuth,
    sunSize: 0.999,
    sunHorizonClip: true,
    sunColor: { r: SkyDefaults.sunColor[0], g: SkyDefaults.sunColor[1], b: SkyDefaults.sunColor[2] },
    moonElevation: SkyDefaults.moonElevation,
    moonAzimuth: SkyDefaults.moonAzimuth,
    moonPhase: uniforms.moonPhase.value,
    turbidity: uniforms.turbidity.value,
    rayleigh: uniforms.rayleigh.value,
    mieCoefficient: uniforms.mieCoefficient.value,
    mieDirectionalG: uniforms.mieDirectionalG.value,
    exposureDay: SkyDefaults.exposureDay,
    exposureNight: SkyDefaults.exposureNight,
    starDensity: uniforms.starDensity.value,
    starBrightness: uniforms.starBrightness.value,
    starGlare: uniforms.starGlare.value,
    bloomStrength: SkyDefaults.bloomStrength,
    bloomRadius: SkyDefaults.bloomRadius,
    bloomThreshold: SkyDefaults.bloomThreshold,
    cameraTilt: SkyDefaults.cameraTilt,
    toneMapping: SkyDefaults.toneMapping,
    themeThreshold: SkyDefaults.themeThreshold,
  }

  let cameraTilt = $state(params.cameraTilt)
  let debugOverride = $state(false)
  let themeFromSlider = false
  let guiRef: GUI | null = null

  function updateAll() {
    const phi = MathUtils.degToRad(90 - params.sunElevation)
    const theta = MathUtils.degToRad(params.sunAzimuth)
    uniforms.sunPosition.value.copy(new Vector3().setFromSphericalCoords(1, phi, theta))

    const moonPhi = MathUtils.degToRad(90 - params.moonElevation)
    const moonTheta = MathUtils.degToRad(params.moonAzimuth)
    uniforms.moonPosition.value.copy(new Vector3().setFromSphericalCoords(1, moonPhi, moonTheta))

    uniforms.moonPhase.value = params.moonPhase
    uniforms.turbidity.value = params.turbidity
    uniforms.rayleigh.value = params.rayleigh
    uniforms.mieCoefficient.value = params.mieCoefficient
    uniforms.mieDirectionalG.value = params.mieDirectionalG
    uniforms.sunAngularDiameterCos.value = params.sunSize
    uniforms.sunHorizonClip.value = params.sunHorizonClip
    uniforms.sunColor.value = [params.sunColor.r, params.sunColor.g, params.sunColor.b]
    uniforms.starDensity.value = params.starDensity
    uniforms.starBrightness.value = params.starBrightness
    uniforms.starGlare.value = params.starGlare

    if (bloomEffect) {
      bloomEffect.intensity = params.bloomStrength
      bloomEffect.mipmapBlurPass.radius = params.bloomRadius
      bloomEffect.luminanceMaterial.threshold = params.bloomThreshold
    }

    if (toneMappingEffect) {
      toneMappingEffect.mode = (ToneMappings[params.toneMapping] ?? ToneMappings[SkyDefaults.toneMapping]) as ToneMappingMode
    }

    // Auto-exposure: stays at the day value while the sun is well up, then ramps
    // to the night value through twilight (centred on the horizon), like the eye.
    const nightness = 1 - MathUtils.smoothstep(params.sunElevation, -3, 3)
    uniforms.exposure.value = params.exposureDay + (params.exposureNight - params.exposureDay) * nightness
    cameraTilt = params.cameraTilt
    invalidate()
  }

  function updateUniforms(elev: number) {
    params.sunElevation = elev
    updateAll()
  }

  updateUniforms(elevation)

  // lil-gui setup — only with ?debug query param
  $effect(() => {
    if (!debug) return
    let gui: any
    import('three/addons/libs/lil-gui.module.min.js').then(({ GUI }) => {
      gui = new GUI({ title: 'Sky Debug' })
      guiRef = gui

      const sunFolder = gui.addFolder('Sun')
      sunFolder.add(params, 'sunElevation', -10, 55, 0.5).name('Elevation').onChange(() => {
        debugOverride = true
        updateAll()
        const shouldBeDark = params.sunElevation < params.themeThreshold
        const currentTheme = document.documentElement.getAttribute('data-theme')
        if (shouldBeDark && currentTheme !== 'dark') {
          themeFromSlider = true
          $themeStore.theme = 'dark'
          document.documentElement.setAttribute('data-theme', 'dark')
          localStorage.setItem('theme', 'dark')
        } else if (!shouldBeDark && currentTheme !== 'light') {
          themeFromSlider = true
          $themeStore.theme = 'light'
          document.documentElement.setAttribute('data-theme', 'light')
          localStorage.setItem('theme', 'light')
        }
      })
      sunFolder.add(params, 'sunAzimuth', 130, 210, 1).name('Azimuth').onChange(() => { debugOverride = true; updateAll() })
      sunFolder.add(params, 'sunSize', 0.995, 0.9999, 0.0001).name('Size (cos)').onChange(() => { debugOverride = true; updateAll() })
      sunFolder.addColor(params, 'sunColor').name('Color').onChange(() => { debugOverride = true; updateAll() })
      sunFolder.add(params, 'sunHorizonClip').name('Horizon Clip').onChange(() => { debugOverride = true; updateAll() })

      const moonFolder = gui.addFolder('Moon')
      moonFolder.add(params, 'moonElevation', 10, 60, 1).name('Elevation').onChange(() => { debugOverride = true; updateAll() })
      moonFolder.add(params, 'moonAzimuth', 130, 210, 1).name('Azimuth').onChange(() => { debugOverride = true; updateAll() })
      moonFolder.add(params, 'moonPhase', 0, 1, 0.01).name('Phase').onChange(() => { debugOverride = true; updateAll() })

      const atmosFolder = gui.addFolder('Atmosphere')
      atmosFolder.add(params, 'turbidity', 0, 10, 0.1).name('Turbidity').onChange(() => { debugOverride = true; updateAll() })
      atmosFolder.add(params, 'rayleigh', 0, 5, 0.1).name('Rayleigh').onChange(() => { debugOverride = true; updateAll() })
      atmosFolder.add(params, 'mieCoefficient', 0, 0.05, 0.001).name('Mie Coeff').onChange(() => { debugOverride = true; updateAll() })
      atmosFolder.add(params, 'mieDirectionalG', 0, 0.999, 0.01).name('Mie G').onChange(() => { debugOverride = true; updateAll() })

      const starsFolder = gui.addFolder('Stars')
      starsFolder.add(params, 'starDensity', 100, 2000, 50).name('Density').onChange(() => { debugOverride = true; updateAll() })
      starsFolder.add(params, 'starBrightness', 0, 3, 0.05).name('Brightness').onChange(() => { debugOverride = true; updateAll() })
      starsFolder.add(params, 'starGlare', 0, 1, 0.05).name('Glare').onChange(() => { debugOverride = true; updateAll() })

      const bloomFolder = gui.addFolder('Bloom')
      bloomFolder.add(params, 'bloomStrength', 0, 3, 0.01).name('Strength').onChange(() => { debugOverride = true; updateAll() })
      bloomFolder.add(params, 'bloomRadius', 0, 1, 0.01).name('Radius').onChange(() => { debugOverride = true; updateAll() })
      bloomFolder.add(params, 'bloomThreshold', 0, 1, 0.01).name('Threshold').onChange(() => { debugOverride = true; updateAll() })

      const renderFolder = gui.addFolder('Render')
      renderFolder.add(params, 'toneMapping', Object.keys(ToneMappings)).name('Tone Mapping').onChange(() => { debugOverride = true; updateAll() })
      renderFolder.add(params, 'exposureDay', 0.1, 2, 0.01).name('Exposure Day').onChange(() => { debugOverride = true; updateAll() })
      renderFolder.add(params, 'exposureNight', 0.1, 2, 0.01).name('Exposure Night').onChange(() => { debugOverride = true; updateAll() })
      renderFolder.add(params, 'cameraTilt', 0.1, 0.8, 0.01).name('Camera Tilt').onChange(() => { debugOverride = true; updateAll() })
      renderFolder.add(params, 'themeThreshold', -5, 20, 0.5).name('Theme Threshold').onChange(() => updateAll())
    })

    return () => { guiRef = null; gui?.destroy() }
  })

  function easeInOutQuint(t: number): number {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
  }

  function easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4)
  }

  $effect(() => {
    if (debugOverride) return

    const target = targetElevation
    const start = elevation
    const startTime = performance.now()
    const isSunrise = target > start
    const duration = isSunrise ? SkyDefaults.transitionSunrise : SkyDefaults.transitionSunset
    let id: number
    let running = true

    if (Math.abs(target - start) < 0.01) return

    const animate = (now: number) => {
      if (!running) return
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)

      elevation = start + (target - start) * (isSunrise ? easeInOutQuint(t) : easeOutQuart(t))
      updateUniforms(elevation)
      if (guiRef) guiRef.controllersRecursive().forEach(c => c.updateDisplay())

      if (t < 1) {
        id = requestAnimationFrame(animate)
      }
    }

    id = requestAnimationFrame(animate)
    return () => {
      running = false
      cancelAnimationFrame(id)
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  fov={60}
  near={100}
  far={2000000}
  position={[0, 0, 0]}
  rotation={[cameraTilt, 0, 0]}
  zoom={1}
/>
<T.Mesh scale={450000}>
  <T.ShaderMaterial
    name="SkyMoonShader"
    side={BackSide}
    depthWrite={false}
    fragmentShader={SkyMoonShader.fragmentShader}
    vertexShader={SkyMoonShader.vertexShader}
    {uniforms}
  />
  <T.SphereGeometry args={[1, 64, 32]} />
</T.Mesh>
