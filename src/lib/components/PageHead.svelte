<script lang="ts">
  export let title: string
  export let description: string
</script>

<svelte:head>
  <title>{title}</title>

  <meta property="og:site_name" content="ttt.io" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>
