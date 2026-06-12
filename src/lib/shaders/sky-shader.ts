import { Vector3 } from 'three';
import { ToneMappingMode } from 'postprocessing';

// Tone mapping handled by the pmndrs postprocessing ToneMappingEffect.
// Eye-adaptation auto-exposure is applied as a separate pre-tone-map stage,
// so it works on top of any of these operators (AgX, etc.).
export const ToneMappings: Record<string, number> = {
  Linear: ToneMappingMode.LINEAR,
  Reinhard: ToneMappingMode.REINHARD2,
  Cineon: ToneMappingMode.CINEON,
  ACES: ToneMappingMode.ACES_FILMIC,
  AgX: ToneMappingMode.AGX,
  Neutral: ToneMappingMode.NEUTRAL,
};

export const SkyDefaults = {
  toneMapping: 'AgX',
  // Auto-exposure (applied pre-tone-map, works on top of AgX etc.). Interpolated
  // in realtime from sun elevation, so it tracks the transition with no timeout.
  exposureDay: 0.3,
  exposureNight: 1.3,
  sunAzimuth: 165,
  sunElevationDay: 48,
  sunElevationNight: -2.5,
  moonElevation: 48,
  moonAzimuth: 165,
  cameraTilt: 0.52,
  themeThreshold: 5,
  transitionSunrise: 4500,
  transitionSunset: 4500,
  sunColor: [1.0, 0.95, 0.82] as [number, number, number],
  bloomStrength: 0.5,
  bloomRadius: 0.45,
  bloomThreshold: 0.0,
};

export const SkyMoonShader = {
  name: 'SkyMoonShader',

  uniforms: {
    turbidity: { value: 2 },
    rayleigh: { value: 1.8 },
    mieCoefficient: { value: 0.003 },
    mieDirectionalG: { value: 0.75 },
    sunPosition: { value: new Vector3() },
    sunAngularDiameterCos: { value: 0.9985 },
    sunHorizonClip: { value: true },
    sunColor: { value: [...SkyDefaults.sunColor] },
    up: { value: new Vector3(0, 1, 0) },
    moonPosition: { value: new Vector3() },
    moonAlbedoMap: { value: null },
    moonPhase: { value: 0.7 },
    exposure: { value: 0.3 },
    starDensity: { value: 300.0 },
    starBrightness: { value: 0.7 },
    starGlare: { value: 0.3 },
  },

  // Vertex shader: Preetham atmospheric scattering (unchanged from Three.js Sky)
  vertexShader: /* glsl */ `
    uniform vec3 sunPosition;
    uniform float rayleigh;
    uniform float turbidity;
    uniform float mieCoefficient;
    uniform vec3 up;

    varying vec3 vWorldPosition;
    varying vec3 vSunDirection;
    varying float vSunfade;
    varying vec3 vBetaR;
    varying vec3 vBetaM;
    varying float vSunE;

    const float e = 2.71828182845904523536028747135266249775724709369995957;
    const float pi = 3.141592653589793238462643383279502884197169;

    const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
    const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

    const float v = 4.0;
    const vec3 K = vec3( 0.686, 0.678, 0.666 );
    const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

    const float cutoffAngle = 1.6110731556870734;
    const float steepness = 1.5;
    const float EE = 1000.0;

    float sunIntensity( float zenithAngleCos ) {
      zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
      return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
    }

    vec3 totalMie( float T ) {
      float c = ( 0.2 * T ) * 10E-18;
      return 0.434 * c * MieConst;
    }

    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      gl_Position.z = gl_Position.w;

      vSunDirection = normalize( sunPosition );
      vSunE = sunIntensity( dot( vSunDirection, up ) );
      vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

      float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );
      vBetaR = totalRayleigh * rayleighCoefficient;
      vBetaM = totalMie( turbidity ) * mieCoefficient;
    }
  `,

  // Fragment shader: Preetham scattering + procedural moon + stars
  fragmentShader: /* glsl */ `
    varying vec3 vWorldPosition;
    varying vec3 vSunDirection;
    varying float vSunfade;
    varying vec3 vBetaR;
    varying vec3 vBetaM;
    varying float vSunE;

    uniform float mieDirectionalG;
    uniform vec3 up;
    uniform vec3 moonPosition;
    uniform sampler2D moonAlbedoMap;
    uniform float moonPhase;
    uniform float starDensity;
    uniform float starBrightness;
    uniform float starGlare;
    uniform float exposure;

    const float pi = 3.141592653589793238462643383279502884197169;
    const float rayleighZenithLength = 8.4E3;
    const float mieZenithLength = 1.25E3;
    uniform float sunAngularDiameterCos;
    uniform bool sunHorizonClip;
    uniform vec3 sunColor;
    const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
    const float ONE_OVER_FOURPI = 0.07957747154594767;

    const float moonAngularRadius = 0.04;

    // --- Scattering phase functions (Preetham) ---

    float rayleighPhase( float cosTheta ) {
      return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
    }

    float hgPhase( float cosTheta, float g ) {
      float g2 = pow( g, 2.0 );
      float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
      return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
    }

    // --- Noise (used by Kolmogorov turbulence) ---

    float hash2( vec2 p ) {
      return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453123 );
    }

    float vnoise( vec2 p ) {
      vec2 i = floor( p );
      vec2 f = fract( p );
      f = f * f * ( 3.0 - 2.0 * f );
      return mix(
        mix( hash2( i ), hash2( i + vec2( 1, 0 ) ), f.x ),
        mix( hash2( i + vec2( 0, 1 ) ), hash2( i + vec2( 1, 1 ) ), f.x ),
        f.y
      );
    }

    // --- Kolmogorov-spectrum turbulence (PSD ∝ κ^-11/3) ---

    float kolmogorovFbm( vec2 p ) {
      float v = 0.0, a = 1.0, f = 1.0;
      for ( int i = 0; i < 5; i++ ) {
        v += a * vnoise( p * f );
        f *= 2.0;
        a *= 0.281; // 2^(-11/6) — Kolmogorov amplitude decay
      }
      return v;
    }

    // --- Procedural starfield with physically-based magnitude/glare ---
    // References: Jensen et al. SIGGRAPH 2001, "Single Pass Day/Night Sky"

    float starHash( vec2 p ) {
      return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453123 );
    }

    vec3 stars( vec3 direction ) {
      vec3 dir = normalize( direction );
      float theta = acos( dir.y );
      float phi = atan( dir.z, dir.x );

      vec2 cell = vec2( phi, theta ) * starDensity / pi;
      vec2 cellId = floor( cell );
      vec2 cellUV = fract( cell );

      vec3 totalLight = vec3( 0.0 );

      for ( int x = -1; x <= 1; x++ ) {
        for ( int y = -1; y <= 1; y++ ) {
          vec2 neighbor = vec2( float( x ), float( y ) );
          vec2 id = cellId + neighbor;

          float presence = step( 0.82, starHash( id + 200.0 ) );
          if ( presence < 0.5 ) continue;

          vec2 starPos = vec2( starHash( id ), starHash( id + 100.0 ) );
          float d = length( cellUV - neighbor - starPos );

          // Visual magnitude 1-6 (1=brightest, 6=faintest naked-eye)
          float mag = 1.0 + starHash( id + 300.0 ) * 5.0;

          // Brightness: 2.512^(6-mag) — magnitude scale (Jensen et al.)
          float intensity = pow( 2.512, 6.0 - mag );

          // Apparent disc size scales with brightness (PSF/glare)
          // Bright stars (mag 1): radius ~0.04, faint stars (mag 6): ~0.008
          float radius = 0.006 + 0.035 * intensity / pow( 2.512, 5.0 );

          // Core + glare halo (point spread function approximation)
          float core = smoothstep( radius, 0.0, d );
          float glare = exp( -d * d / ( radius * radius * 4.0 ) ) * starGlare;
          float star = ( core + glare ) * intensity * 0.04;

          // Star color from temperature (B-V index approximation)
          float temp = starHash( id + 500.0 );
          vec3 starColor = temp < 0.3
            ? mix( vec3( 0.7, 0.8, 1.0 ), vec3( 0.9, 0.95, 1.0 ), temp / 0.3 )  // hot blue-white
            : temp < 0.7
            ? vec3( 1.0, 0.98, 0.95 )  // mid white-yellow
            : mix( vec3( 1.0, 0.9, 0.7 ), vec3( 1.0, 0.75, 0.5 ), ( temp - 0.7 ) / 0.3 );  // cool orange

          totalLight += starColor * star;
        }
      }

      return totalLight;
    }

    // --- Main ---

    void main() {
      vec3 direction = normalize( vWorldPosition - cameraPosition );

      // Preetham atmospheric scattering
      float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
      float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
      float sR = rayleighZenithLength * inverse;
      float sM = mieZenithLength * inverse;

      vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      float cosTheta = dot( direction, vSunDirection );
      float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
      vec3 betaRTheta = vBetaR * rPhase;
      float mPhase = hgPhase( cosTheta, mieDirectionalG );
      vec3 betaMTheta = vBetaM * mPhase;

      vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
      Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 0.5 ) ),
             clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // L0: ambient + sun disc + moon + stars
      vec3 L0 = vec3( 0.1 ) * Fex;

      // --- Sun disc with physical atmospheric effects ---
      float sunAlt = dot( vSunDirection, up );
      // Turbulence scales with air mass (optical path length through atmosphere)
      float turbStrength = smoothstep( 0.3, 0.0, sunAlt );

      // Sun-local coordinate frame
      vec3 sunRight = normalize( cross( up, vSunDirection ) );
      vec3 sunUp = cross( vSunDirection, sunRight );

      // 1. Kolmogorov ray displacement — turbulence bends light rays
      //    Physical amplitude: ~1-5 arcsec at horizon (~0.00002 rad)
      //    Exaggerated slightly for visibility as a background element
      vec2 turbUV = direction.xz * 80.0;
      float dispX = kolmogorovFbm( turbUV ) * 0.00012 * turbStrength;
      float dispY = kolmogorovFbm( turbUV + 50.0 ) * 0.00012 * turbStrength;
      vec3 turbDir = normalize( direction + sunRight * dispX + sunUp * dispY );

      // 2. Bennett differential refraction — flattens sun ~1/6 at horizon
      float turbCos = dot( turbDir, vSunDirection );
      vec3 sunOffset = turbDir - vSunDirection * turbCos;
      float localX = dot( sunOffset, sunRight );
      float localY = dot( sunOffset, sunUp );
      float flatLocalY = localY / mix( 1.0, 0.72, turbStrength );

      vec3 flatDir = vSunDirection * turbCos + sunRight * localX + sunUp * flatLocalY;
      float flatCos = dot( normalize( flatDir ), vSunDirection );

      // 3. Green flash — chromatic dispersion (each wavelength refracts differently)
      //    Red refracts least, blue most. ~10 arcsec separation at horizon.
      //    Exaggerated for visibility.
      float dispersion = 0.0004 * turbStrength;
      float flatCosR = dot( normalize( vSunDirection * turbCos + sunRight * localX + sunUp * ( flatLocalY - dispersion ) ), vSunDirection );
      float flatCosG = flatCos;
      float flatCosB = dot( normalize( vSunDirection * turbCos + sunRight * localX + sunUp * ( flatLocalY + dispersion ) ), vSunDirection );

      // Sun disc per channel — creates color fringing at sunset
      float sundiskR = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, flatCosR );
      float sundiskG = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, flatCosG );
      float sundiskB = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, flatCosB );

      // 4. Wavelength-dependent solar limb darkening (per channel)
      float angRadius = acos( sunAngularDiameterCos );
      float rR = clamp( acos( clamp( flatCosR, -1.0, 1.0 ) ) / angRadius, 0.0, 1.0 );
      float rG = clamp( acos( clamp( flatCosG, -1.0, 1.0 ) ) / angRadius, 0.0, 1.0 );
      float rB = clamp( acos( clamp( flatCosB, -1.0, 1.0 ) ) / angRadius, 0.0, 1.0 );
      vec3 limbDark = vec3(
        1.0 - 0.55 * ( 1.0 - sqrt( max( 0.0, 1.0 - rR * rR ) ) ),
        1.0 - 0.65 * ( 1.0 - sqrt( max( 0.0, 1.0 - rG * rG ) ) ),
        1.0 - 0.80 * ( 1.0 - sqrt( max( 0.0, 1.0 - rB * rB ) ) )
      );

      vec3 sundisk = vec3( sundiskR, sundiskG, sundiskB );

      // 5. Scintillation — turbulence causes brightness variations across the disc
      float scintNoise = kolmogorovFbm( turbUV * 3.0 + 20.0 );
      float scintillation = 1.0 + ( scintNoise - 0.5 ) * 0.15 * turbStrength;

      // Per-pixel horizon clipping
      float horizonClip = sunHorizonClip ? smoothstep( -0.003, 0.003, dot( direction, up ) ) : 1.0;

      // Sun disc — glow handled by the bloom post-processing pass
      L0 += sunColor * ( vSunE * 19000.0 * Fex ) * sundisk * limbDark * scintillation * horizonClip;

      // Moon — physically based rendering
      // Models: Lommel-Seeliger BRDF, Hapke opposition surge, Mie atmospheric glow
      // Texture: NASA LRO CGI Moon Kit (svs.gsfc.nasa.gov/4720)
      // References: Jensen et al. SIGGRAPH 2001, Hapke 1963/1993
      vec3 moonDir = normalize( moonPosition );
      float cosMoonAngle = dot( direction, moonDir );
      float moonAngDist = acos( clamp( cosMoonAngle, -1.0, 1.0 ) );

      // Illuminated fraction — fades glow and disc near new moon
      float illumination = 1.0 - abs( moonPhase * 2.0 - 1.0 );
      float moonVisibility = smoothstep( 0.0, 0.15, illumination );

      // Atmospheric glow — Mie forward scattering (physical halo through air)
      // Tighter halo handled by the bloom post-processing pass
      float moonMiePhase = hgPhase( cosMoonAngle, mieDirectionalG );
      L0 += vBetaM * moonMiePhase * 1500.0 * moonVisibility;

      // Moon disc with anti-aliased edge
      float moonMask = smoothstep( moonAngularRadius + 0.0008, moonAngularRadius - 0.0002, moonAngDist );

      if ( moonMask > 0.0 ) {
        // Tangent frame — keep vertical aligned with screen to avoid skew
        vec3 moonUp = normalize( up - moonDir * dot( up, moonDir ) );
        vec3 moonRight = cross( moonDir, moonUp );
        vec3 toFrag = direction - moonDir * cosMoonAngle;
        vec2 moonUV = vec2( dot( toFrag, moonRight ), dot( toFrag, moonUp ) ) / moonAngularRadius;

        // Spherical UV for texture lookup (equirectangular projection)
        float discR = length( moonUV );
        vec3 surfacePos = vec3( moonUV.x, moonUV.y, sqrt( max( 0.0, 1.0 - discR * discR ) ) );
        float lon = atan( surfacePos.x, surfacePos.z ) / ( 2.0 * pi ) + 0.5;
        float lat = asin( clamp( surfacePos.y, -1.0, 1.0 ) ) / pi + 0.5;

        vec3 texAlbedo = texture2D( moonAlbedoMap, vec2( lon, 1.0 - lat ) ).rgb;

        // Surface normal for lighting
        vec3 surfaceNormal = normalize( moonDir + moonRight * moonUV.x * 0.3 + moonUp * moonUV.y * 0.3 );
        vec3 viewDir = -direction;

        // Lommel-Seeliger BRDF — no limb darkening (physically correct)
        float cosI = max( 0.001, dot( surfaceNormal, vSunDirection ) );
        float cosE = max( 0.001, dot( surfaceNormal, viewDir ) );
        float ls = cosI / ( cosI + cosE );

        // Hapke opposition surge: B(g) = B0 / (1 + tan(g/2) / h)
        float phaseAngle = acos( clamp( dot( vSunDirection, -direction ), -1.0, 1.0 ) );
        float opposition = 1.0 / ( 1.0 + tan( min( phaseAngle * 0.5, 1.5 ) ) / 0.06 );

        // Moon phase — terminator position from moonPhase uniform
        // moonPhase: 0.0 = new moon, 0.5 = full moon, 1.0 = new moon
        float phaseAngleRad = ( moonPhase - 0.5 ) * pi;
        float terminatorX = surfacePos.x * cos( phaseAngleRad ) - surfacePos.z * sin( phaseAngleRad );
        float phaseMask = smoothstep( -0.03, 0.03, terminatorX );

        // Earthshine on the dark side (very faint, Jensen et al.)
        // Only visible when there's enough lit area to provide context
        float earthshine = 0.015 * ( 1.0 - phaseMask ) * moonVisibility;

        // Combine: texture albedo × BRDF × phase
        vec3 moonColor = texAlbedo * ls * ( 1.0 + opposition ) * phaseMask;
        moonColor += texAlbedo * earthshine;

        // Brightness multiplier (artistic — real albedo too dim for background)
        L0 += moonMask * moonColor * 35.0 * moonVisibility;
      }

      // Composition — output linear HDR, let Three.js ACES handle tone mapping
      vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

      // Stars — added after the 0.04 scale so they're not crushed
      // Occluded by moon disc
      float sunAltitude = dot( vSunDirection, up );
      float starFade = smoothstep( 0.0, -0.15, sunAltitude );
      float aboveHorizon = smoothstep( -0.01, 0.05, dot( direction, up ) );
      float moonOcclusion = 1.0 - smoothstep( moonAngularRadius + 0.005, moonAngularRadius - 0.001, moonAngDist );
      vec3 starLight = stars( direction ) * starFade * aboveHorizon * moonOcclusion * starBrightness;
      texColor += starLight;

      // Output exposed linear HDR — bloom operates on these values (so the
      // moon blooms more as night exposure rises), tone mapping applied last.
      // Clamp below the HalfFloat ceiling (65504): the raw sun value is ~1e6
      // which overflows to Inf, and Inf in the bloom mipmap blur becomes NaN —
      // rendered as black/colored squares on iOS GPUs. A finite cap still
      // blooms strongly and tone-maps to white.
      vec3 hdr = min( texColor * exposure, vec3( 1000.0 ) );
      gl_FragColor = vec4( hdr, 1.0 );
    }
  `,
};
