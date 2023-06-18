<script lang="ts">
  import type { PageData } from './$types'

  import WebSite from '$lib/components/WebSite.svelte'
  import PageHead from '$lib/components/PageHead.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'
  import { browser } from '$app/environment'

  import { Canvas } from '@threlte/core'
  import { SkyDefaults, ToneMappings } from '$lib/shaders/sky-shader'
  import Sky from './sky.svelte'

  let { data }: { data: PageData } = $props()

  let webglSupported = $state(false)

  if (browser) {
    try {
      const canvas = document.createElement('canvas')
      webglSupported = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch (e) {
      webglSupported = false
    }
  }
</script>

<svelte:head>
  {#if webglSupported}
    <style>
      html, body { background-color: transparent !important; }
      html { font-weight: 400 !important; }
      h1, h2, h3, strong, p, span, footer, footer p { color: var(--color-text-primary); transition: color 2.5s ease; }
      a, a:visited, a:active { color: var(--color-text-emphasis); transition: color 2.5s ease; }
      .icon svg, .toggle-group svg { transition: fill 2.5s ease; }
      .toggle-group { transition: border-color 2.5s ease; }
      pre, code { transition: background-color 2.5s ease; }
    </style>
  {/if}
</svelte:head>

<WebSite />

<PageHead title="Antonin Stefanutti's Blog" />

{#if webglSupported}
  <div class="sky">
    <Canvas
      renderMode="on-demand"
      toneMapping={ToneMappings[SkyDefaults.toneMapping]}
    >
      <Sky />
    </Canvas>
  </div>
{/if}

{#each data.posts as { slug, title, author, date }}
  <ArticleTitle {slug} {title} />
  <ArticleMeta {author} {date} />
{/each}

<style>
  .sky {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
</style>
