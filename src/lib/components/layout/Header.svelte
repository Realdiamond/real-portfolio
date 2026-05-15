<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { activeSection, isMenuOpen } from '$lib/stores/navigation';
	import { onMount } from 'svelte';

	const navLinks = [
		{ href: '#hero', label: 'Home', id: 'hero' },
		{ href: '#projects', label: 'Projects', id: 'projects' },
		{ href: '#skills', label: 'Skills', id: 'skills' },
		{ href: '#about', label: 'About', id: 'about' },
		{ href: '#contact', label: 'Contact', id: 'contact' }
	];

	let scrolled = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 40;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function handleNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		isMenuOpen.set(false);
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function toggleMenu() {
		isMenuOpen.update((v) => !v);
	}
</script>

<header class="site-header" class:scrolled>
	<div class="container header-inner">
		<!-- Logo -->
		<a href="/" class="logo" aria-label="Timilehin Akinsanmi - Home">
			<span class="logo-bracket">&lt;</span>
			<span class="logo-name">T.Akinsanmi</span>
			<span class="logo-bracket"> /&gt;</span>
		</a>

		<!-- Desktop Nav -->
		<nav class="desktop-nav" aria-label="Main navigation">
			{#each navLinks as link (link.id)}
				<a
					href={link.href}
					class="nav-link"
					class:active={$activeSection === link.id}
					onclick={(e) => handleNavClick(e, link.href)}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Right actions -->
		<div class="header-actions">
			<!-- Theme Toggle -->
			<button
				id="theme-toggle"
				class="theme-btn"
				aria-label="Toggle theme"
				onclick={() => theme.toggle()}
			>
				{#if $theme === 'dark'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
							x1="12"
							y1="21"
							x2="12"
							y2="23"
						/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
							x1="18.36"
							y1="18.36"
							x2="19.78"
							y2="19.78"
						/><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line
							x1="4.22"
							y1="19.78"
							x2="5.64"
							y2="18.36"
						/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{/if}
			</button>

			<!-- Hire Me CTA -->
			<a href="#contact" class="hire-btn" onclick={(e) => handleNavClick(e, '#contact')}>
				Hire Me
			</a>

			<!-- Mobile Hamburger -->
			<button
				id="menu-toggle"
				class="hamburger"
				class:open={$isMenuOpen}
				aria-label="Toggle mobile menu"
				aria-expanded={$isMenuOpen}
				onclick={toggleMenu}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if $isMenuOpen}
		<nav class="mobile-nav" aria-label="Mobile navigation">
			{#each navLinks as link (link.id)}
				<a
					href={link.href}
					class="mobile-nav-link"
					class:active={$activeSection === link.id}
					onclick={(e) => handleNavClick(e, link.href)}
				>
					{link.label}
				</a>
			{/each}
			<a
				href="#contact"
				class="hire-btn mobile-hire"
				onclick={(e) => handleNavClick(e, '#contact')}
			>
				Hire Me
			</a>
		</nav>
	{/if}
</header>

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--z-sticky);
		padding: var(--space-4) 0;
		transition: all var(--transition-base);
		border-bottom: 1px solid transparent;
	}

	.site-header.scrolled {
		background: color-mix(in srgb, var(--bg-primary), transparent 15%);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-bottom-color: var(--border);
		padding: var(--space-3) 0;
		box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
	}

	/* Logo */
	.logo {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--text-primary);
		text-decoration: none;
		letter-spacing: -0.02em;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.logo-bracket {
		color: var(--accent-primary);
	}
	.logo-name {
		color: var(--text-primary);
	}

	/* Desktop Nav */
	.desktop-nav {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.nav-link {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: var(--accent-primary);
		border-radius: var(--radius-full);
		transition: width var(--transition-base);
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--accent-primary);
	}

	.nav-link.active::after,
	.nav-link:hover::after {
		width: 60%;
	}

	/* Header Actions */
	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-shrink: 0;
	}

	/* Theme Button */
	.theme-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--bg-surface);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.theme-btn:hover {
		border-color: var(--accent-primary);
		color: var(--accent-primary);
		box-shadow: var(--glow-cyan);
	}

	/* Hire Me Button */
	.hire-btn {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--bg-primary);
		background: var(--accent-primary);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.hire-btn:hover {
		background: var(--accent-secondary);
		color: white;
		transform: translateY(-1px);
		box-shadow: var(--glow-purple);
	}

	/* Hamburger */
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--space-2);
		border-radius: var(--radius-md);
	}

	.hamburger span {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--text-primary);
		border-radius: var(--radius-full);
		transition: all var(--transition-base);
		transform-origin: center;
	}

	.hamburger.open span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.hamburger.open span:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}
	.hamburger.open span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Mobile Nav */
	.mobile-nav {
		display: flex;
		flex-direction: column;
		padding: var(--space-4) var(--space-6);
		border-top: 1px solid var(--border);
		background: var(--bg-surface);
		gap: var(--space-2);
	}

	.mobile-nav-link {
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--text-secondary);
		text-decoration: none;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
	}

	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		color: var(--accent-primary);
		background: var(--bg-surface-hover);
	}

	.mobile-hire {
		margin-top: var(--space-2);
		text-align: center;
	}

	@media (max-width: 768px) {
		.desktop-nav {
			display: none;
		}
		.hire-btn:not(.mobile-hire) {
			display: none;
		}
		.hamburger {
			display: flex;
		}
	}

	@media (min-width: 769px) {
		.mobile-nav {
			display: none !important;
		}
	}
</style>
