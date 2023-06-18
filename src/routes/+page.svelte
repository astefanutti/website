<script lang="ts">
  import type { PageData } from './$types'

  import PageHead from '$lib/components/PageHead.svelte'
  import Article from '$lib/components/Article.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'
  import ArticleDescription from '$lib/components/ArticleDescription.svelte'

  export let data: PageData

  import { Canvas } from '@threlte/core'
  import { ACESFilmicToneMapping } from 'three'
  import Sky from './sky.svelte'

  let width: number, height: number
  let elevation = 0
</script>

<PageHead title="ttt.io" description="Antonin Stefanutti's Blog" />

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<input type="range" min="-5" max="35" step="0.1" bind:value={elevation} />
<div>{elevation}</div>

<Canvas
  frameloop="demand"
  size={{ width: width, height: height }}
  toneMapping={ACESFilmicToneMapping}
>
  <Sky {elevation} azimuth={170} />
</Canvas>

{#each data.posts as { slug, title, author, description, date }}
  <ArticleTitle {slug} {title} />
  <ArticleMeta {author} {date} />
  <ArticleDescription {description} {slug} />
{/each}

<slot />

<style>
  :global(canvas[data-engine^='three.js']) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
  }
</style>
