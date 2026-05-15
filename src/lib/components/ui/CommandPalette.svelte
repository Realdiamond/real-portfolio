<script lang="ts">
	import { isCommandPaletteOpen } from '$lib/stores/navigation';
	import { theme } from '$lib/stores/theme';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	interface PaletteAction {
		id: string;
		label: string;
		description?: string;
		icon: string;
		category: string;
		action: () => void;
	}

	let query = $state('');
	let selectedIndex = $state(0);
	let inputEl = $state<HTMLInputElement | null>(null);

	const allActions: PaletteAction[] = [
		// Navigation
		{
			id: 'nav-hero',
			label: 'Go to Home',
			icon: '🏠',
			category: 'Navigate',
			action: () => scrollTo('#hero')
		},
		{
			id: 'nav-projects',
			label: 'Go to Projects',
			icon: '🚀',
			category: 'Navigate',
			action: () => scrollTo('#projects')
		},
		{
			id: 'nav-skills',
			label: 'Go to Skills',
			icon: '⚡',
			category: 'Navigate',
			action: () => scrollTo('#skills')
		},
		{
			id: 'nav-about',
			label: 'Go to About',
			icon: '👤',
			category: 'Navigate',
			action: () => scrollTo('#about')
		},
		{
			id: 'nav-contact',
			label: 'Go to Contact',
			icon: '✉️',
			category: 'Navigate',
			action: () => scrollTo('#contact')
		},
		// Actions
		{
			id: 'toggle-theme',
			label: 'Toggle Dark/Light Mode',
			icon: '🌓',
			category: 'Actions',
			action: () => theme.toggle()
		},
		{
			id: 'download-resume',
			label: 'Download Resume',
			description: 'Open resume PDF',
			icon: '📄',
			category: 'Actions',
			action: () => {
				if (browser) window.open('/assets/Timilehin_Akinsanmi_Resume.pdf', '_blank');
			}
		},
		// Projects
		{
			id: 'proj-glazion',
			label: 'GlazionStudio',
			description: 'AI for Ceramics & Pottery',
			icon: '🏺',
			category: 'Projects',
			action: () => {
				if (browser) window.open('https://glazion-studio.vercel.app', '_blank');
			}
		},
		{
			id: 'proj-seunbot',
			label: 'SeunBot Pro',
			description: 'AI Trading Dashboard',
			icon: '📈',
			category: 'Projects',
			action: () => {
				if (browser) window.open('https://seunbot-pro.vercel.app', '_blank');
			}
		},
		{
			id: 'proj-silentkey',
			label: 'SilentKey',
			description: 'E2E Encrypted Messaging',
			icon: '🔐',
			category: 'Projects',
			action: () => {
				if (browser) window.open('https://silentkey-stage4b.vercel.app', '_blank');
			}
		},
		{
			id: 'proj-invoice',
			label: 'Invoice Manager',
			description: 'Invoice CRUD App',
			icon: '📋',
			category: 'Projects',
			action: () => {
				if (browser) window.open('https://invoice-web-app-lime.vercel.app', '_blank');
			}
		},
		// Social
		{
			id: 'social-github',
			label: 'Open GitHub',
			description: 'github.com/Realdiamond',
			icon: '🐙',
			category: 'Social',
			action: () => {
				if (browser) window.open('https://github.com/Realdiamond', '_blank');
			}
		},
		{
			id: 'social-linkedin',
			label: 'Open LinkedIn',
			description: 'linkedin.com/in/oluwatimilehin0-akinsanmi1',
			icon: '💼',
			category: 'Social',
			action: () => {
				if (browser)
					window.open('https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/', '_blank');
			}
		},
		{
			id: 'social-twitter',
			label: 'Open Twitter/X',
			description: '@Iam_RealDiamond',
			icon: '🐦',
			category: 'Social',
			action: () => {
				if (browser) window.open('https://x.com/Iam_RealDiamond', '_blank');
			}
		},
		{
			id: 'social-email',
			label: 'Send Email',
			description: 'realdiamonddigital@gmail.com',
			icon: '📧',
			category: 'Social',
			action: () => {
				if (browser) window.location.href = 'mailto:realdiamonddigital@gmail.com';
			}
		}
	];

	let filtered = $derived(
		query.trim() === ''
			? allActions
			: allActions.filter(
					(a) =>
						a.label.toLowerCase().includes(query.toLowerCase()) ||
						a.description?.toLowerCase().includes(query.toLowerCase()) ||
						a.category.toLowerCase().includes(query.toLowerCase())
				)
	);

	// Reset index when filtered changes
	$effect(() => {
		// reactive on filtered
		void filtered;
		selectedIndex = 0;
	});

	function scrollTo(id: string) {
		if (!browser) return;
		const el = document.querySelector(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	}

	function close() {
		isCommandPaletteOpen.set(false);
		query = '';
	}

	function runAction(action: PaletteAction) {
		action.action();
		close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % Math.max(filtered.length, 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex =
				(selectedIndex - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1);
		} else if (e.key === 'Enter' && filtered[selectedIndex]) {
			e.preventDefault();
			runAction(filtered[selectedIndex]);
		}
	}

	// Global ⌘K / Ctrl+K shortcut
	onMount(() => {
		if (!browser) return;
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				isCommandPaletteOpen.update((v) => !v);
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});

	// Focus input when opened
	$effect(() => {
		if ($isCommandPaletteOpen) {
			tick().then(() => inputEl?.focus());
		}
	});

	// Group filtered by category
	let grouped = $derived(
		filtered.reduce<Record<string, PaletteAction[]>>((acc, action) => {
			if (!acc[action.category]) acc[action.category] = [];
			acc[action.category].push(action);
			return acc;
		}, {})
	);
</script>

{#if $isCommandPaletteOpen}
	<!-- Backdrop -->
	<div
		class="palette-backdrop"
		onclick={close}
		onkeydown={() => {}}
		role="presentation"
		aria-hidden="true"
	></div>

	<!-- Palette -->
	<div
		class="palette"
		role="dialog"
		aria-modal="true"
		aria-label="Command palette"
		tabindex="-1"
		onkeydown={handleKeydown}
	>
		<!-- Search -->
		<div class="palette-search">
			<svg
				class="search-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
			</svg>
			<input
				bind:this={inputEl}
				bind:value={query}
				placeholder="Type a command or search..."
				class="palette-input"
				autocomplete="off"
				spellcheck="false"
				aria-label="Command search"
				id="command-palette-input"
			/>
			<kbd class="esc-hint">ESC</kbd>
		</div>

		<!-- Results -->
		<div class="palette-results" role="listbox">
			{#if filtered.length === 0}
				<div class="palette-empty">No results for "{query}"</div>
			{:else}
				{#each Object.entries(grouped) as [category, actions] (category)}
					<div class="palette-group">
						<p class="group-label">{category}</p>
						{#each actions as action (action.id)}
							{@const flatIndex = filtered.indexOf(action)}
							<button
								class="palette-item"
								class:selected={selectedIndex === flatIndex}
								onclick={() => runAction(action)}
								role="option"
								aria-selected={selectedIndex === flatIndex}
								id="palette-item-{action.id}"
							>
								<span class="item-icon">{action.icon}</span>
								<span class="item-body">
									<span class="item-label">{action.label}</span>
									{#if action.description}
										<span class="item-desc">{action.description}</span>
									{/if}
								</span>
								<span class="item-cat">{category}</span>
							</button>
						{/each}
					</div>
				{/each}
			{/if}
		</div>

		<!-- Footer -->
		<div class="palette-footer">
			<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
			<span><kbd>↵</kbd> select</span>
			<span><kbd>ESC</kbd> close</span>
		</div>
	</div>
{/if}

<style>
	.palette-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(6px);
		z-index: calc(var(--z-modal) + 1);
	}

	.palette {
		position: fixed;
		top: 18%;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		max-width: calc(100vw - 2rem);
		background: var(--bg-surface);
		border: 1px solid rgba(0, 255, 229, 0.2);
		border-radius: var(--radius-2xl);
		box-shadow:
			0 25px 80px rgba(0, 0, 0, 0.6),
			var(--glow-cyan);
		z-index: calc(var(--z-modal) + 2);
		overflow: hidden;
		animation: scale-in 0.15s ease;
	}

	/* Search */
	.palette-search {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-5);
		border-bottom: 1px solid var(--border);
	}

	.search-icon {
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	.palette-input {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		font-family: var(--font-body);
		font-size: var(--text-base);
		color: var(--text-primary);
	}

	.palette-input::placeholder {
		color: var(--text-tertiary);
	}

	.esc-hint {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-tertiary);
		background: var(--bg-surface-hover);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 2px 6px;
		flex-shrink: 0;
	}

	/* Results */
	.palette-results {
		max-height: 380px;
		overflow-y: auto;
		padding: var(--space-2) 0;
		scrollbar-width: thin;
		scrollbar-color: var(--border) transparent;
	}

	.palette-empty {
		text-align: center;
		padding: var(--space-8);
		color: var(--text-tertiary);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	.palette-group {
		padding: var(--space-1) 0;
	}

	.group-label {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-tertiary);
		padding: var(--space-1) var(--space-5);
		margin-bottom: 2px;
	}

	.palette-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-3) var(--space-5);
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background var(--transition-fast);
		border-radius: 0;
	}

	.palette-item:hover,
	.palette-item.selected {
		background: rgba(0, 255, 229, 0.07);
	}

	.palette-item.selected .item-label {
		color: var(--accent-primary);
	}

	.item-icon {
		font-size: 1.1rem;
		flex-shrink: 0;
		width: 24px;
		text-align: center;
	}

	.item-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
	}

	.item-label {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-primary);
		transition: color var(--transition-fast);
	}

	.item-desc {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		font-family: var(--font-mono);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-cat {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-tertiary);
		flex-shrink: 0;
	}

	/* Footer */
	.palette-footer {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-5);
		border-top: 1px solid var(--border);
		background: var(--bg-surface-hover);
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-tertiary);
	}

	kbd {
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: 3px;
		padding: 1px 5px;
		font-family: var(--font-mono);
		font-size: 10px;
	}
</style>
