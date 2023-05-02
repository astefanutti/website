<script lang="ts">
  import '../app.css'
  import { page } from '$app/stores'
  import SvelteTheme from '$lib/theme/SvelteTheme.svelte'
  import themeStore from '$lib/theme/index'
  import { icons } from './icons'
</script>

<SvelteTheme />

<header class="navbar">
  <span>
    <a href="/">
      {#if $page.url.pathname === '/'}
        <h1 class="title">ttt.io</h1>
      {:else}
        <span class="title small">ttt.io</span>
      {/if}
    </a>
    <span class="icons">
      <a class="icon" href="https://github.com/astefanutti">{@html icons.github}</a>
      <a class="icon" href="https://fosstodon.org/@ttt">{@html icons.mastodon}</a>
      <a class="icon" href="https://twitter.com/a7tti">{@html icons.twitter}</a>
    </span>
  </span>

  <fieldset class="toggle-group">
    <label>
      <input
        type="radio"
        name="color-scheme"
        id="color-scheme-light"
        value="light"
        checked={$themeStore.theme == 'light'}
        on:click={() => ($themeStore.theme = 'light')}
        data-sr
      />
      {@html icons.sun}
    </label>
    <label>
      <input
        type="radio"
        name="color-scheme"
        value="system"
        checked={$themeStore.theme == 'system'}
        on:click={() => ($themeStore.theme = 'system')}
        data-sr
      />
      {@html icons.system}
    </label>
    <label>
      <input
        type="radio"
        name="color-scheme"
        id="color-scheme-dark"
        value="dark"
        checked={$themeStore.theme == 'dark'}
        on:click={() => ($themeStore.theme = 'dark')}
        data-sr
      />
      {@html icons.moon}
    </label>
  </fieldset>
</header>

<main>
  <slot />
</main>

<footer>
  <p>
    Copyright &#169; <a href="https://github.com/astefanutti">Antonin Stefanutti</a>, {new Date().getFullYear()}
  </p>
</footer>

<style>
  :global([data-theme='light']) {
    --border-color: #ccc;
    --background-color: #ccc;
  }

  :global([data-theme='dark']) {
    --border-color: #585858;
    --background-color: #aaa;
  }

  .toggle-group {
    border: 1px solid var(--border-color);
    border-radius: 24px;
    inline-size: fit-content;
    padding: 3px 3px 2px 3px;
  }
  .toggle-group label {
    border-radius: 21px;
    border: 1px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    display: inline-flex;
    padding: 0.3em 0.3em;
    text-align: center;
    user-select: none;
  }
  .toggle-group label:has(input:checked) {
    background-color: var(--background-color);
    border: 1px solid var(--background-color);
  }

  .toggle-group input:not(checked) + :global(svg) {
    fill: var(--color-text-primary);
  }

  .toggle-group input:checked + :global(svg) {
    fill: invert(var(--color-text-primary));
  }

  :global([data-theme='light']) label:has(#color-scheme-light:not(:checked)) {
    border-color: var(--border-color);
    border-width: 1px;
    border-style: solid;
  }

  :global([data-theme='dark']) label:has(#color-scheme-dark:not(:checked)) {
    border-color: var(--border-color);
    border-width: 1px;
    border-style: solid;
  }

  [data-sr] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>
