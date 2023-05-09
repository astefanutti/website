<script lang="ts">
  import type { PageData } from './$types'
  import type { SvelteComponentTyped } from 'svelte/internal'

  import Article from '$lib/components/Article.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'
  import PageHead from '$lib/components/PageHead.svelte'

  export let data: PageData

  type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>
  $: component = data.component as unknown as C
</script>

<Article>
  <PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
  <ArticleTitle title={data.frontmatter.title} />
  <ArticleMeta author={data.frontmatter.author} date={data.frontmatter.date} />

  <svelte:component this={component} />
</Article>
