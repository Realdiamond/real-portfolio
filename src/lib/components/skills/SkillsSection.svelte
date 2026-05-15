<script lang="ts">
	import { skillCategories } from '$lib/data/skills';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let sectionEl: HTMLElement;
	let animated = $state(false);

	onMount(() => {
		if (!browser) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					animated = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="skills" class="section" bind:this={sectionEl}>
	<div class="container">
		<p class="section-label">Expertise</p>
		<h2 class="section-title">Tech Stack</h2>
		<p class="section-subtitle">
			A curated set of tools and technologies I use to build fast, accessible, and beautiful digital
			experiences.
		</p>

		<div class="skills-grid">
			{#each skillCategories as cat, ci (cat.label)}
				<div
					class="skill-category"
					style="--cat-color: {cat.color}; animation-delay: {ci * 100}ms"
					class:visible={animated}
				>
					<div class="cat-header">
						<span class="cat-dot" style="background: {cat.color}"></span>
						<h3 class="cat-label">{cat.label}</h3>
					</div>

					<div class="skills-list">
						{#each cat.skills as skill, si (skill.name)}
							<div class="skill-item">
								<div class="skill-meta">
									<span class="skill-name">{skill.name}</span>
									<span class="skill-level">{skill.level}%</span>
								</div>
								<div class="skill-bar-bg">
									<div
										class="skill-bar-fill"
										style="
                      width: {animated ? skill.level + '%' : '0%'};
                      background: {cat.color};
                      transition-delay: {ci * 100 + si * 60}ms;
                    "
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Tech cloud -->
		<div class="tech-cloud">
			{#each skillCategories as cat (cat.label)}
				{#each cat.skills as skill (skill.name)}
					<span class="tech-pill" style="--pill-color: {cat.color}">{skill.name}</span>
				{/each}
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
		margin-bottom: var(--space-12);
	}

	@media (max-width: 900px) {
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 560px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}

	.skill-category {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease,
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.skill-category.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.skill-category:hover {
		border-color: var(--cat-color);
		box-shadow: 0 0 20px color-mix(in srgb, var(--cat-color) 15%, transparent);
	}

	.cat-header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.cat-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.cat-label {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text-primary);
		letter-spacing: 0.05em;
	}

	.skills-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.skill-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.skill-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.skill-name {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		font-weight: 500;
	}
	.skill-level {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-tertiary);
	}

	.skill-bar-bg {
		height: 4px;
		background: var(--bg-surface-hover);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.skill-bar-fill {
		height: 100%;
		border-radius: var(--radius-full);
		transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
	}

	.skill-bar-fill::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 6px;
		background: inherit;
		border-radius: 50%;
		filter: brightness(1.5);
	}

	/* Tech cloud */
	.tech-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		justify-content: center;
		padding: var(--space-8);
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-2xl);
	}

	.tech-pill {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--pill-color, var(--accent-primary));
		background: color-mix(in srgb, var(--pill-color, var(--accent-primary)) 8%, transparent);
		border: 1px solid color-mix(in srgb, var(--pill-color, var(--accent-primary)) 25%, transparent);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
		cursor: default;
	}

	.tech-pill:hover {
		background: color-mix(in srgb, var(--pill-color, var(--accent-primary)) 20%, transparent);
		transform: translateY(-2px) scale(1.05);
	}
</style>
