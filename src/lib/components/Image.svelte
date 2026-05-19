<script lang="ts">
  let { src, alt, sizes = '' }: { src: any; alt: string; sizes?: string } = $props()
</script>

<picture>
  {#each Object.entries(src.sources) as [format, srcset]}
    <source
      {srcset}
      type={'image/' + format}
      sizes={sizes || '100vw'}
    />
  {/each}
  <img src={src.img.src} width={src.img.w} height={src.img.h} {alt} loading="lazy" />
</picture>

<style>
  img {
    max-width: 100%;
    height: auto;
  }
</style>
