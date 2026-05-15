<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AIChatbot from '$lib/components/ai/AIChatbot.svelte';
	import CommandPalette from '$lib/components/ui/CommandPalette.svelte';
	import '$lib/styles/global.css';
	import '$lib/styles/animations.css';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { activeSection } from '$lib/stores/navigation';
	import { browser } from '$app/environment';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		if (!browser) return;
		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) activeSection.set(entry.target.id);
				});
			},
			{ threshold: 0.4 }
		);
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});
</script>

<a href="#main-content" class="skip-nav">Skip to content</a>
<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />
<AIChatbot />
<CommandPalette />
