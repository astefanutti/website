import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob(`/src/posts/**/index.{md,svx,svelte.md}`);

	let post;
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			post = await resolver() as App.MdsvexFile;
			break;
		}
		const file = await resolver() as App.MdsvexFile;
		if (file.metadata.slug === params.slug) {
			post = file;
			break;
		}
	}

	if (!post || !post.metadata.published) {
		throw error(404); // Couldn't resolve the post
	}

	return {
		component: post.default,
		frontmatter: post.metadata
	};
};
