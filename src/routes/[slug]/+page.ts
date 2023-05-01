import type { PageLoad } from './$types';
// import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
  const modules = import.meta.glob(`/src/posts/**/index.{md,svx,svelte.md}`);

  for (const [path, resolver] of Object.entries(modules)) {
    const post = await resolver() as App.MdsvexFile;
    if (post.metadata.published && post.metadata.slug === params.slug) {
      return {
        component: post.default,
        frontmatter: post.metadata
      };
    }
  }

  // for (const [path, resolver] of Object.entries(modules)) {
  //   if (slugFromPath(path) === params.slug) {
  //     const post = await resolver() as App.MdsvexFile;
  //     if (post.metadata.published) {
  //       return {
  //         component: post.default,
  //         frontmatter: post.metadata
  //       };
  //     }
  //   }
  // }

  throw error(404); // Couldn't resolve the post
};
