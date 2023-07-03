---
title: Running OpenGL Shaders on the Jetson Nano
date: 2023-06-12
published: true
slug: glsl-jetson-nano
tags:
  - OpenGL
  - Jetson Nano
---

<script>
  import { Vega, VegaLite } from 'svelte-vega';
  import Image from '$lib/components/Image.svelte';

  import jetsonImg from './jetson.jpg?width=600;1000;1400';
  import recoveryImg from './recovery.jpg?width=600;1000;1400';
  import precisionImg from './precision.jpg?width=400;800';
  import tearingImg from './tearing.jpg?width=400;800';

  import RaspberrySVG from './raspberry.svg';
  import NvidiaSVG from './nvidia.svg';
  import PatternSVG from './pattern.svg';

  import Specs from "./specs.js";
  import BenchmarkGeekbench from "./geekbench.js";
  import Benchmark3DMark from "./3dmark.js";
  import Benchmark from "./benchmark.js";

  const marginImgSizes="(max-width: calc(1.4 * 800px)) 25vw, 400px";
</script>

<figure class="fullwidth">
  <Image src={jetsonImg} alt="A shader running on the Jetson Nano"/>
  <figcaption>
    A <a href="https://www.shadertoy.com/view/fstyD4">shader</a> from{' '}
    <a href="https://www.shadertoy.com">Shadertoy</a> running on the Jetson Nano at 26 FPS in Full HD
  </figcaption>
</figure>

[kms-glsl]: https://github.com/astefanutti/kms-glsl

Few years ago, I [experimented](/glsl-raspberry-pi) with running OpenGL shaders using the Linux kernel [Direct Rendering Manager](https://docs.kernel.org/gpu/introduction.html), and the [Kernel Mode Setting](https://docs.kernel.org/gpu/drm-kms.html) API.
I captured the result of this experiment into the [kms-glsl] project, that I've used ever since to run my favorite shaders from [Shadertoy](https://www.shadertoy.com), on the Rapsberry Pi 4.
Unsurprisingly, it quickly became obvious the RPi 4 VideoCore VI GPU would not be capable of rendering complex shaders at decent FPS, nor reasonably scale with display resolution.
It was time for an upgrade!

## Jetson Nano

You could argue I should go for using a desktop computer, with a mid-range graphics card.
And you'd probably be right!
Yet, I have long term goals for the project, that are best met by single board computers.
So I've reviewed the SBCs I've been able to find, and that are listed hereafter:

<figure>

| SBC                            | SoC                        | CPU                                              | GPU                             | RAM             | Price<sup>*</sup> |
| ------------------------------ | -------------------------- | ------------------------------------------------ | ------------------------------- | --------------- | ----------------- |
| [Jetson Nano][jetson-nano]     | Tegra X1 T210 TM660M-A2    | 4x Cortex-A57 @ 1.43GHz                          | Maxwell 128 CUDA cores @ 921Mhz | 4GB             | $149              |
| [ODROID-N2L][odroid-n2l]       | ARM Amlogic S922X          | 4x Cortex-A73 @ 2.2Ghz, 2x Cortex-A53 @ 2Ghz     | Mali-G52 6EE @ 800MHz           | 4GB             | $130              |
| [Orange Pi 5][orange-pi5]      | Rockchip RK3588S           | 4x Cortex-A76 @ 2.4GHz, 4x Cortex-A55 @ 1.8GHz   | Mali-G610 MP4 @ 600MHz          | 16GB            | $149              |
| [Quartz64B][quartz64b]         | Rockchip RK3566            | 4x Cortex-A55 @ 1.8GHz                           | Mali-G52 MP2 @ 800MHz           | 8GB             | $80               |
| [ROCK 5A][rock5a]              | Rockchip RK3588S           | 4x Cortex-A76 @ 2.4GHz, 4x Cortex-A55 @ 1.8GHz   | Mali-G610 MC4 @ 600MHz          | 16GB            | $170              |
| [Tinker Board 2][tinker-board] | Rockchip RK3399            | 2x Cortex-A72 @ 2.0 GHz, 4x Cortex-A53 @ 1.5 GHz | Mali-T860 MP4 @ 800MHz          | 4GB             | $179              |
| [UDOO BOLT V3][udoo-bolt]      | AMD Ryzen™ Embedded V1202B | 4x cores @ 2.3GHz (3.2GHz boost)                 | AMD Radeon™ Vega 3 @ 1GHz       | 2x SO-DIMM DDR4 | $437              |
| [UDOO VISION X5][udoo-vision]  | Intel® Atom™ x5-E3940      | 4x cores @ 1.6GHz                                | Intel® HD Graphics 500 @ 600MHz | 4GB             | $349              |

<figcaption><sup>*</sup>Retail prices, as of May 2023, are very volatile, so is availability.</figcaption>

</figure>

[jetson-nano]: https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-nano/
[odroid-n2l]: https://wiki.odroid.com/odroid-n2l/hardware
[orange-pi5]: http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5.html
[quartz64b]: https://wiki.pine64.org/wiki/Quartz64
[rock5a]: https://wiki.radxa.com/Rock5/5a
[tinker-board]: https://tinker-board.asus.com/product/tinker-board-2.html
[udoo-bolt]: https://www.udoo.org/discover-the-udoo-bolt/
[udoo-vision]: https://www.udoo.org/udoo-vision/

Given my primary use case, GPU performance, relative to price, is the main decision criteria.
The following diagram gives the relative differences between these GPUs, for some specifications, like the number of [shaders](https://en.wikipedia.org/wiki/Unified_shader_model), [FLOP/s](https://en.wikipedia.org/wiki/FLOPS), or [pixel fillrate](https://en.wikipedia.org/wiki/Fillrate):

<Vega spec={Specs} options={{actions: false, renderer: 'svg'}} />

Ultimately, the metric that matters the most for graphical applications is FPS[^1], and deriving it from a GPU specifications requires a deep understanding of its architecture.
That led me to searching for some benchmarks, that would help me to practically compare the performance of these GPUs, for the use cases closest to mine.

[^1]: The second metric may be the power efficiency, if you care about electrical consumption. But that's not yet a real issue for SBCs!

Publicly available benchmarks usually focus on graphics card GPUs, not GPUs that equip SBCs, nor mobile phones.
Even when they do, they seldomly provide data for all the GPUs listed above.
The results from the few ones I was able to find are illustrated in the diagrams below:

<VegaLite spec={BenchmarkGeekbench} options={{actions: false, renderer: 'svg'}} />

<VegaLite spec={Benchmark3DMark} options={{actions: false, renderer: 'svg'}} />

I concluded the Jetson Nano would be the best compromise.
While it has inferior FLOP/s and Pixel/s theoretical performance limits than the Orange Pi 5, it provides the greatest number of shaders per price, which is very likely to be the limiting factor for my use case[^2].
Yet, I was still hesitant to spend that amount of money, without any guarantees I'd be able to run [kms-glsl] on it, nor it'd run orders of magnitude faster than on the Raspberry Pi 4!

[^2]: The Jetson Nano compute module form factor is another advantage, with its 260-pin SODIMM-style System-on-Module (SoM), so it can be used in different contexts, like with the [Turing Pi 2](https://turingpi.com/product/turing-pi-2/).

What actually triggered me, is the realisation the Jetson Nano Tegra X1 GPU/SoC is [almost the same](https://en.wikipedia.org/wiki/Tegra#Devices_6) as the Nintendo Switch one[^3].
At least, it cleared the later concern I had.
So I went on and bought a [Jetson Nano developer kit](https://developer.nvidia.com/embedded/jetson-nano-developer-kit), then tried to run [kms-glsl], and it failed!

[^3]: NVIDIA has disabled some shading units on the Jetson Nano GPU, to reach 128 shaders, unlike the Nintendo Switch (2017, HAC-001) GPU variant, which has all the 256 shaders enabled.

Out of the box[^4], on the most recent Linux Jetson version, that still supports the Jetson Nano (R32.7.3 as of writing), it fails to initialize GBM.
When switching to the [Tegra DRM driver](https://www.kernel.org/doc/html/v4.16/gpu/tegra.html), with `sudo modprobe tegra-udrm modeset=1`, it fails to initialize EGL.
It seems NVIDIA hasn't considered GBM support a priority until recently, and the version of the Tegra DRM driver packaged in Jetson Linux 32 may be too old.

[^4]: That is with the DRM-NVDC compatibility library, which implements the Direct Rendering Manager API (DRM), on top of the Tegra Display Controller kernel driver (NVDC).

On the other hand, the [OpenEmbedded for Tegra][OE4T] project (OE4T) provides [tegra-udrm-gbm], a wrapper for `libnvgbm.so` to work with Mesa's GBM backend loader.
So I was set to build my own Linux distribution, with [OpenEmbedded for Tegra][OE4T]! 🚀

[OE4T]: https://github.com/OE4T
[tegra-udrm-gbm]: https://github.com/OE4T/tegra-udrm-gbm

## OpenEmbedded for Tegra

[OE4T] is a community project that provides support for NVIDIA Tegra (Jetson) platforms, on top of [OpenEmbedded](https://www.openembedded.org).
It comes with the [meta-tegra] BSP layer for NVIDIA Jetson platforms, based on L4T, that can be used to build a Linux distribution that includes [tegra-udrm-gbm].

[meta-tegra]: https://github.com/OE4T/meta-tegra

### Building the Distribution

After a couple of iterations, I came up with the following instructions, that build a minimal distribution image, which can be used to flash the Jetson Nano, and run [kms-glsl] successfully:

1. Start a build environment, that contains the toolchain, on your host machine, using a [Poky container](https://github.com/crops/poky-container):

  ```ps1
  $ docker run --rm -it -v `pwd`:/workdir crops/poky:ubuntu-22.04
  ```

  It provides an operating system agnostic environment, that can be used on Windows, Mac, or Linux.
  If you're on a native Linux host machine, it's also possible to [set it up](https://docs.yoctoproject.org/brief-yoctoprojectqs/index.html), to run the build directly on it.

2. Setup the build, from the [tegra-demo-distro](https://github.com/OE4T/tegra-demo-distro) reference distributions project:

  ```ps1
  $ git clone -b kirkstone-l4t-r32.7.x https://github.com/OE4T/tegra-demo-distro.git
  $ cd tegra-demo-distro
  $ git submodule update --init
  $ . ./setup-env --machine jetson-nano-devkit
  ```

  It's important to use the `kirkstone-l4t-r32.7.x` branch, as it's the latest stable (LTS) branch that supports L4T R32.7.3, and the Jetson Nano.

3. Update the build configuration, by appending the following changes:

  ```ps1
  $ cat <<EOT >> conf/local.conf
  DISTRO_FEATURES:remove = "wayland"

  EXTRA_IMAGE_FEATURES = "tools-sdk dev-pkgs debug-tweaks"

  IMAGE_INSTALL:append = " mesa tegra-udrm-gbm tegra-udrm-probeconf egl-gbm"

  CORE_IMAGE_BASE_INSTALL:remove = "packagegroup-demo-egltests"

  # Tools needed to build kms-glsl
  CORE_IMAGE_EXTRA_INSTALL += "git"
  CORE_IMAGE_EXTRA_INSTALL += "make"
  CORE_IMAGE_EXTRA_INSTALL += "gcc"
  CORE_IMAGE_EXTRA_INSTALL += "vim"
  EOT
  ```

4. Start the build (it may take a while to complete):

  ```ps1
  $ bitbake demo-image-egl
  ```

5. Once completed, you can copy the distribution image into the mounted host directory, and exit the build container:

  ```ps1
  $ cp tmp/deploy/images/jetson-nano-devkit/demo-image-egl-jetson-nano-devkit.tegraflash.tar.gz /workdir/
  $ exit
  ```

### Flashing the Jetson Nano

The distribution image that you've just built, can now be used to flash the Jetson Nano:

1. Prepare the Jetson Nano to boot in recovery mode, which can be achieved by shorting pins 3 and 4 (you can find more information in the [Flashing the Jetson Dev Kit](https://github.com/OE4T/meta-tegra/wiki/Flashing-the-Jetson-Dev-Kit) guide):

  <Image src={recoveryImg} alt="Jetson Nano recovery mode"/>

2. Connect the Jetson Nano to your host machine via the micro-B USB port, power it up via the 5V jack barrel, and check it's connected:

  ```ps1
  $ lsusb -d 0955:
  Bus 011 Device 002: ID 0955:7f21 NVIDIA Corp. APX
  ```

3. Untar the image archive:

  ```ps1
  $ tar -xf demo-image-egl-jetson-nano-devkit.tegraflash.tar.gz
  ```

4. Flash the Jetson Nano:

  ```ps1
  $ sudo ./doflash.sh
  ```

### Compiling and Testing

The Jetson Nano will reboot once the flashing has successfully completed.
You can then login as `root`, and test [kms-glsl], by running the following instructions:

1. Build the project:

  ```ps1
  $ git clone https://github.com/astefanutti/kms-glsl.git
  $ cd kms-glsl
  $ make
  ```

2. Run an example, e.g.:

  ```ps1
  $ ./glsl examples/costal_landscape.glsl

  Using display 0x55aadc1320 with EGL version 1.5
  ===================================
  EGL information:
    version: "1.5"
    vendor: "NVIDIA"
  ===================================
  OpenGL ES 2.x information:
    version: "OpenGL ES 3.2 NVIDIA 32.7.3"
    shading language version: "OpenGL ES GLSL ES 3.20"
    vendor: "NVIDIA Corporation"
    renderer: "NVIDIA Tegra X1 (nvgpu)/integrated"
  ===================================
  Using GLSL version directive: #version 320 es
  Rendered 41 frames in 2.049823 sec (20.001726 fps)
  ```

I was quite happy to have [kms-glsl] running on the Jetson Nano.
At least, I had passed the embarrassement of having bought a unit for nothing.
Yet, this was not the end of the journey!

## Bugs and Improvements

As I gave few sample shaders a try, I quickly noticed some issues:

1. While some shaders were rendering correctly, others were having weird glitches[^5].
  It's only when I realised the later were performing more higher precision floating point operations than the former, that I figured it out!
  The shaders were configured to use the `mediump` precision, and changing it to `highp` fixed it[^6].
  As some systems do not support `highp` precision, I changed the shaders setup, to rely on the `GL_FRAGMENT_PRECISION_HIGH` pre-processor macro:

  ```glsl class="liquid"
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif
  ```

[^5]: An example of the floating point precision issue, with this [shader](https://www.shadertoy.com/view/fstyD4) (to be compared with the picture in introduction):<br/><Image src={precisionImg} alt="An example of floating precision issue" sizes={marginImgSizes}/>

[^6]: The Raspberry Pi does not seem to take that parameter into account, but the Jetson Nano definitely does!

2. As I got passed that first issue, I noticed some shaders were flickering.
  Only those that render at high FPS were affected.
  That's about the only hint I could get.
  So I debugged it, and noticed the calls to `drmModePageFlip` were immediately returning, without page had flipped!
  I went double check the [Jetson Linux DRM API implementation](https://docs.nvidia.com/jetson/l4t-multimedia/group__direct__rendering__manager.html#gaf16a05d5b066b226eb1063e31a364e04), which explicitely documents that deviation from the usual behavior[^7].
  So the flushing must be done explicitely, which can be achieved by calling `glFinish()`.
  This fixed it, and I also double checked it did not impact the rendering on other implementations, e.g., on the Raspberry Pi.

[^7]: "`drmModePageFlip` _does not wait for rendering to complete, nor is future rendering blocked until the flip completes. This differs from KMS based implementations that utilize implicit synchronization._"

3. At last, all the shaders were rendering visually OK.
  However, the rendering was peaking at 30 FPS for a large proportion.
  For the first time since I started experimenting with [kms-glsl], the limiting factor wasn't the GPU anymore, it was the display refresh rate!
  That led me to [add support for async page flipping](https://github.com/astefanutti/kms-glsl/pull/14/files), using the `DRM_MODE_PAGE_FLIP_ASYNC` flag, e.g.:

  ```c class="liquid"
  uint32_t flags;
  if (options->async_page_flip) {
    flags |= DRM_MODE_PAGE_FLIP_ASYNC;
  } else {
    flags |= DRM_MODE_PAGE_FLIP_EVENT;
  }
  // With the DRM legacy API
  drmModePageFlip(drm.fd, drm.crtc_id, fb->fb_id, flags, &waiting_for_flip);
  // Or with the DRM atomic API
  drmModeAtomicCommit(drm.fd, req, flags, NULL);
  ```

  While that solved the issue, it comes at the cost of possible on-screen tearing, which can become clearly visible, depending on the nature of the shader.
  As the double frame buffers get swapped, asynchronously from the [vertical blanking](https://www.kernel.org/doc/html/v6.3/gpu/drm-kms.html#vertical-blanking) period, visual artifacts can result from the display hardware scanning out the new frame buffer.
  This is particularly visible for high-contrast vertical lines[^8].
  A possible solution would be to implement **tripple buffering**, so a third frame buffer can immediately be used to render the next frame, while the two others stay locked, until the next vertical blanking period.

[^8]: A visible example of tearing:<br/><Image src={tearingImg} alt="An example of tearing" sizes={marginImgSizes}/>

## Benchmark

I can finally answer that one question: have I made a good decision to choose the Jetson Nano to achieve my initial goal, i.e., being able to run shaders at faster FPS, and larger display resolution, than on the Raspberry Pi 4?
The following diagram illustrates the distribution of FPS, that I've measured for [a set of 59 shaders](https://github.com/astefanutti/kms-glsl/tree/10ce390c7f82e5ba776cc63d95949d011cce7a3a/examples), running either on the Raspberry Pi 4 or the Jetson Nano, on the same display, at full HD resolution (1920×1080 pixels):

<RaspberrySVG/>
<NvidiaSVG/>
<PatternSVG/>

<figure>
  <Vega spec={Benchmark} options={{actions: false, renderer: 'svg'}} />
  <figcaption><sup>+</sup>Over the set of shaders from the project <a href="https://github.com/astefanutti/kms-glsl/tree/10ce390c7f82e5ba776cc63d95949d011cce7a3a/examples">examples</a> directory.<br/>Async refers to async page flipping, using the <code>DRM_MODE_PAGE_FLIP_ASYNC</code> flag.</figcaption>
</figure>

The Jetson Nano is an order of magnitude faster!
The median gets a 8.5× factor in synchronous pageflip mode, that locks the Jetson Nano to the display refresh rate, and a 11.9× factor in asynchronous pageflip mode.
While 75% of the shaders render under 15 FPS on the Raspberry Pi 4, 75% render above on the Jetson Nano.

## Next

My earlier experimentation, with [kms-glsl] on the Raspberry Pi 4, has always felt more like a toy project, than a practical solution.
Now with the Jetson Nano, I feel like I can move on to the next level, and start building more capable applications.
The Jetson Nano is already 4 years old, and is being superseeded by the [Jetson Orin Nano](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/), that raises the bar, in terms of specifications, and price :)
I can't wait to combine the AI/ML capabilities of the Jetson Nano, to augment the interactivity of OpenGL shaders, for example.
There is so much potential there...

Stay tuned!
