<script lang="ts">
  import type { PageData } from './$types'

  import WebSite from '$lib/components/WebSite.svelte'
  import PageHead from '$lib/components/PageHead.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'

  export let data: PageData
</script>

<WebSite />

<PageHead title="Antonin Stefanutti's Blog" />

{#each data.posts as { slug, title, author, date }}
  <ArticleTitle {slug} {title} />
  <ArticleMeta {author} {date} />
{/each}

<slot />
