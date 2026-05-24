---
title: "Shaderbang: Shebang for Shaders"
date: 2026-05-21
published: true
slug: shaderbang
tags:
  - OpenGL
  - Python
---

<script>
  import Image from '$lib/components/Image.svelte';
  import clothVideo from './cloth.mp4';
  import plasmaGlobeImg from './plasma_globe.png?w=600;1000;1400';
</script>

<figure class="fullwidth">
  <video src={clothVideo} autoplay loop muted playsinline style="width: 100%;"></video>
  <figcaption>
    A cloth simulation with <a href="https://github.com/NVIDIA/warp">NVIDIA Warp</a>, running on an RTX 5090 FE and a Magedok 16" 4K OLED touchscreen
  </figcaption>
</figure>

[^tldr] A couple of years ago, I wrote about [running OpenGL shaders on the Raspberry Pi](/glsl-raspberry-pi), and later on the [Jetson Nano](/glsl-jetson-nano), using the Linux kernel DRM/KMS subsystem to render shaders fullscreen.
The experiment grew into a proper Python toolkit that I've named [Shaderbang](https://github.com/astefanutti/shaderbang)[^1].

[^tldr]: {-} **TL;DR:** Install with `pip install shaderbang`, or head to the **[project repository](https://github.com/astefanutti/shaderbang).**

[^1]: The name is a portmanteau of _shader_ and _shebang_, as will become clear shortly.

The core idea remains the same: render OpenGL directly via [DRM/KMS](https://en.wikipedia.org/wiki/Direct_Rendering_Manager) with support for hot-pluggable [evdev](https://docs.kernel.org/input/input.html#evdev) input devices -- keyboard, mouse, touchscreen, and trackpad.
What's changed is that Shaderbang is now a Python package[^2] that can be used as a library to build interactive applications.

[^2]: Shaderbang is published on [PyPI](https://pypi.org/project/shaderbang/) with pre-built binary wheels.

It still runs [Shadertoy](https://www.shadertoy.com) shaders out of the box on devices ranging from the Raspberry Pi Zero to desktop GPUs.
While Shadertoy is a remarkable creative platform, its [web-based constraints](https://www.shadertoy.com/howto) -- fragment-shader-only execution, four buffers for state, no arbitrary memory writes -- make complex simulations difficult to express.
With Shaderbang now written as a native Python library, it's easier to add deep learning and simulation libraries to the mix, as in the following example.

## The Cloth Simulation

The video above shows a GPU-accelerated cloth simulation, implemented in a single Python file[^3].
It uses [NVIDIA Warp](https://github.com/NVIDIA/warp) for GPU compute, solving an [XPBD](https://matthias-research.github.io/pages/publications/XPBD.pdf) physics model with distance and bending constraints, particle self-collision, and continuous rigid-body collision detection.

[^3]: The simulation is inspired by Matthias Mueller's [Ten Minute Physics](https://matthias-research.github.io/pages/tenMinutePhysics/) series, specifically the [GPU Cloth](https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/16-GPUCloth.py) example.

The rendering uses OpenGL's fixed-function pipeline via [PyOpenGL](https://pyopengl.sourceforge.net/), with the cloth mesh shared between Warp and OpenGL through CUDA-GL interop -- no data copies between the CPU and GPU.

The entire application -- physics, rendering, camera, input handling -- is built by subclassing Shaderbang's `Input` class, which provides lifecycle hooks: `init()`, `pre_render()`, `render()`, and `post_render()`.
Each component (scene, camera, ground, sphere, cloth, keyboard, mouse, touchscreen, trackpad) is an `Input` subclass wired into the render loop.

The simulation is fully interactive.
You can grab and drag cloth particles with the mouse or touchscreen, orbit and dolly the camera, translate and rotate the sphere, toggle wireframe rendering, pause and single-step the simulation -- all via keyboard shortcuts and multi-touch gestures[^4].

[^4]: Multi-touch gesture recognition (pinch-to-zoom, rotation) uses events from the Linux kernel [multi-touch protocol](https://www.kernel.org/doc/Documentation/input/multi-touch-protocol.txt).

## Shebang for Shaders

The project's name comes from a simple idea: what if you could make a shader file executable, just like a shell script?

On Unix, the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) (`#!`) on the first line of a file tells the kernel which interpreter to use.
GLSL treats `#` as a preprocessor directive, and `#!` is silently ignored by most GLSL compilers[^5].
So you can add a shebang to a `.glsl` file, and it just works:

[^5]: In practice, support for `#!` depends on the GPU driver's GLSL compiler. Shaderbang strips the shebang line before passing the source to OpenGL, so it works regardless.

```glsl class="liquid wrap"
#!/usr/bin/env -S python -m shaderbang.shadertoy -t iChannel0 presets/tex_RGBA_noise_medium.png

// Shader code below...
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // ...
}
```

Make it executable, and run it directly:

```shell class="wrap"
$ chmod +x examples/plasma_globe.glsl
$ ./examples/plasma_globe.glsl
```

The shader is the program, and the shebang turns it into a self-contained, executable artifact.
The example shaders in the repository are set up this way.

<figure>
  <Image src={plasmaGlobeImg} alt="Plasma Globe"/>
  <figcaption>
    <a href="https://www.shadertoy.com/view/XsjXRm">Plasma Globe</a> shadertoy by <a href="https://www.shadertoy.com/user/nimitz">nimitz</a>, running with Shaderbang
  </figcaption>
</figure>

## Single-file Scripts

The cloth simulation takes this further with [PEP 723](https://peps.python.org/pep-0723/) inline script metadata.
The `cloth.py` file declares its own dependencies in a `# /// script` block:

```python
#!/usr/bin/env -S uv run --script

# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "shaderbang",
#     "pyopengl",
#     "warp-lang",
# ]
# ///
```

With [uv](https://docs.astral.sh/uv/), this means zero-install execution.
You can run it locally:

```shell class="wrap"
$ uv run examples/cloth.py
```

Or directly from GitHub, without cloning the repository:

```shell class="wrap"
$ uv run https://raw.githubusercontent.com/astefanutti/shaderbang/main/examples/cloth.py
```

`uv` reads the inline metadata, creates an isolated environment, installs the dependencies, and runs the script.
No virtualenv setup, no `requirements.txt`, no `pip install` -- the script _is_ the specification.

## Shadertoy

Shaderbang ships with a `shadertoy` command that runs shaders from [shadertoy.com](https://www.shadertoy.com) directly on your hardware:

```shell class="wrap"
$ shadertoy examples/plasma_globe.glsl -t iChannel0 presets/tex_RGBA_noise_medium.png
```

It supports the standard Shadertoy uniforms (`iTime`, `iFrame`, `iResolution`, `iMouse`, `iDate`) along with texture channels (`iChannel0`--`iChannel3`) for 2D textures, cubemaps, and 3D volumes.

The GLSL version is auto-detected at runtime, adapting between OpenGL ES 2.0, ES 3.0, and desktop OpenGL.
This means the same shader runs on a Raspberry Pi Zero (ES 2.0 only) and an NVIDIA RTX GPU (desktop GL 4.6) without modification[^6].

[^6]: The EGL initialization tries desktop OpenGL first with a compatibility profile, stepping down from GL 4.6 to 3.0, then falls back to OpenGL ES 3.0 and ES 2.0. The shader templates adapt their `#version` directive and syntax (attribute/varying vs. in/out) accordingly.

You can browse [shadertoy.com](https://www.shadertoy.com), copy the shader source, and run it locally -- or use the examples in the project repository.

## Input Devices

Input handling relies on the Linux [evdev](https://docs.kernel.org/input/input.html#evdev) interface.
Devices are detected automatically at startup by scanning `/dev/input/`, and new devices are picked up at runtime via [inotify](https://en.wikipedia.org/wiki/Inotify) -- plug in a keyboard or touchscreen while a shader is running, and it's wired up on the fly.

The `shadertoy` command maps input to Shadertoy-compatible uniforms.
Mouse position feeds `iMouse`, keyboard state feeds a texture uniform, and touchscreen input can be mapped to a custom `vec4` array uniform for multi-touch.

For library users, the `Input` base class provides direct access to evdev events, with higher-level abstractions for common patterns: button state tracking, mouse deltas, multi-touch slot management, and gesture recognition (pinch-to-zoom via homothety estimation, rotation).

## What's Next

Two features are in the works:

**Wayland lease support** -- currently, Shaderbang takes exclusive control of the display via DRM/KMS[^7].
Wayland compositors can grant a [DRM lease](https://wayland.app/protocols/drm-lease-v1) to an application, allowing it to render directly to a display output without leaving the compositor session[^8].
This will let Shaderbang run alongside a Wayland desktop, using a second monitor for fullscreen shader rendering.

[^7]: Shaderbang supports DRM leases via X11 already, which works on older versions of Raspberry Pi OS. However, I never got it to work with NVIDIA's proprietary drivers.

[^8]: [Sway/wlroots](https://github.com/swaywm/wlroots/pull/1730) has supported DRM leases since 2021. GNOME/Mutter has recently [landed support](https://gitlab.gnome.org/GNOME/mutter/-/merge_requests/3746) as well, now shipping by default in Ubuntu 26.04.

**Shadertoy buffers** -- Shadertoy supports multi-pass rendering through buffer channels (Buffer A--D), where the output of one pass feeds into the next as a texture.
Adding buffer support would unlock a large category of shaders that rely on feedback loops, fluid simulations, and other multi-pass techniques.

I'd love to see what you'll build with it -- your feedback and contributions are more than welcome at [Shaderbang](https://github.com/astefanutti/shaderbang)!
