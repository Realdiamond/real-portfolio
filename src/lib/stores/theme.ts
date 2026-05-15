import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

function createThemeStore() {
	const defaultTheme: Theme = 'dark';

	// Initialize from localStorage or system preference
	let initial: Theme = defaultTheme;
	if (browser) {
		const stored = localStorage.getItem('portfolio-theme') as Theme | null;
		if (stored === 'dark' || stored === 'light') {
			initial = stored;
		} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			initial = 'light';
		}
	}

	const { subscribe, set, update } = writable<Theme>(initial);

	// Apply theme to DOM
	function applyTheme(theme: Theme) {
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('portfolio-theme', theme);
		}
	}

	// Apply initial theme immediately
	if (browser) {
		applyTheme(initial);
	}

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const next: Theme = current === 'dark' ? 'light' : 'dark';
				applyTheme(next);
				return next;
			});
		},
		set: (theme: Theme) => {
			applyTheme(theme);
			set(theme);
		}
	};
}

export const theme = createThemeStore();
