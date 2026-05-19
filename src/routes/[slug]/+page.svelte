<script lang="ts">
  import type { PageData } from './$types'
  import type { Component } from 'svelte'

  import Article from '$lib/components/Article.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'
  import PageHead from '$lib/components/PageHead.svelte'

  let { data }: { data: PageData } = $props()

  const component = $derived(data.component as unknown as Component)
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />

<Article>
  <ArticleTitle title={data.frontmatter.title} />
  <ArticleMeta author={data.frontmatter.author} date={data.frontmatter.date} />
  <svelte:component this={component} />
</Article>
