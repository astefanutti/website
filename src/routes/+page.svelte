<script lang="ts">
  import type { PageData } from './$types'

  import PageHead from '$lib/components/PageHead.svelte'
  import Article from '$lib/components/Article.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'
  import ArticleDescription from '$lib/components/ArticleDescription.svelte'

  export let data: PageData
</script>

<PageHead title="ttt.io" description="Antonin Stefanutti's Blog" />

{#each data.posts as { slug, title, author, description, date }}
  <ArticleTitle {slug} {title} />
  <ArticleMeta {author} {date} />
  <ArticleDescription {description} {slug} />
{/each}

<slot />
