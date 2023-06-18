<script lang="ts">
  export let title: string
  export let description: string = ''
</script>

<svelte:head>
  <title>{title}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}

  <meta property="og:site_name" content="Antonin Stefanutti" />
  <meta property="og:title" content={title} />
  {#if description}
    <meta property="og:description" content={description} />
  {/if}
</svelte:head>
