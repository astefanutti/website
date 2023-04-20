<script lang="ts">
  export let author: string
  export let date: string

  const formattedDate = new Date(date).toDateString()
</script>

<p>
  {#if author}
    <span class="author">{author}</span>
  {/if}
  <span class="date">{formattedDate}</span>
</p>

<style>
  p {
    margin: 0;
    margin-bottom: calc(var(--spacing-unit) * 4);
  }

  .author {
    font-weight: bold;
    margin-right: calc(var(--spacing-unit) * 2);
  }

  .date {
    color: var(--color-text-secondary);
  }
</style>
