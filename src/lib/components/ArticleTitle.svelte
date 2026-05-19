<script lang="ts">
  let { slug = '', title }: { slug?: string; title: string } = $props()
</script>

{#if slug}
  <h2 class="heading" class:large={!slug}>
    <a href={`/${slug}`}>
      {title}
    </a>
  </h2>
{:else}
  <h1 class="heading" class:large={!slug}>
    {title}
  </h1>
{/if}

<style>
  .heading {
    margin: 0;
    font-size: 1.4rem;
  }

  .large {
    font-size: 1.8rem;
  }
</style>
