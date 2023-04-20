<script lang="ts">
  export let src: any
  export let alt: string
  export let sizes: string = ''
</script>

<picture>
  {#each Object.entries(src.sources) as [format, images]}
    <source
      srcset={images.map((i) => `${i.src} ${i.w}w`).join(', ')}
      type={'image/' + format}
      sizes={sizes || '100vw'}
    />
  {/each}
  <img src={src.fallback.src} {alt} loading="lazy" />
  <!-- https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading#images_and_iframes -->
</picture>

<style>
  img {
    max-width: 100%;
  }
</style>
