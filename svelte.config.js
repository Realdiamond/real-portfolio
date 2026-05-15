import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore missing static assets during prerender
				if (path.startsWith('/assets/') || path === '/favicon.png' || path === '/favicon.svg') {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
