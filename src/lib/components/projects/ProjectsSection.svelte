<script lang="ts">
	import { projects, projectCategories } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';
	import { fadeInOnScroll } from '$lib/utils/animations';

	let activeFilter = $state('All');
	let selectedProject = $state<Project | null>(null);

	let filtered = $derived(
		activeFilter === 'All' ? projects : projects.filter((p) => p.category.includes(activeFilter))
	);

	function openModal(p: Project) {
		selectedProject = p;
	}
	function closeModal() {
		selectedProject = null;
	}

	function handleWindowKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<section id="projects" class="section">
	<div class="container">
		<p class="section-label">My Work</p>
		<h2 class="section-title">Featured Projects</h2>
		<p class="section-subtitle">
			A collection of projects that showcase my range — from AI-powered tools to encrypted
			communication systems.
		</p>

		<!-- Filters -->
		<div class="filter-row" role="group" aria-label="Filter projects by category">
			{#each projectCategories as cat (cat)}
				<button
					class="filter-btn"
					class:active={activeFilter === cat}
					onclick={() => (activeFilter = cat)}
					aria-pressed={activeFilter === cat}>{cat}</button
				>
			{/each}
		</div>

		<!-- Grid -->
		<div class="projects-grid">
			{#each filtered as project (project.id)}
				<button
					class="project-card"
					use:fadeInOnScroll
					style="--project-color: {project.color}"
					onclick={() => openModal(project)}
					aria-label="View details for {project.title}"
				>
					<!-- Image -->
					<div class="card-image">
						<img
							src={project.image}
							alt="{project.title} screenshot"
							loading="lazy"
							onerror={(e) => {
								const el = e.currentTarget as HTMLImageElement;
								el.style.display = 'none';
								const fb = el.nextElementSibling as HTMLElement;
								if (fb) fb.style.display = 'flex';
							}}
						/>
						<div class="card-image-fallback" style="display:none">
							<span class="fallback-icon">🚀</span>
							<span>{project.title}</span>
						</div>
						{#if project.featured}
							<span class="featured-badge">Featured</span>
						{/if}
					</div>

					<!-- Content -->
					<div class="card-body">
						<div class="card-header">
							<div>
								<h3 class="card-title">{project.title}</h3>
								<p class="card-tagline">{project.tagline}</p>
							</div>
							<div class="card-links">
								{#if project.live}
									<a
										href={project.live}
										target="_blank"
										rel="noopener noreferrer"
										class="icon-link"
										aria-label="Live demo"
										onclick={(e) => e.stopPropagation()}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
											/><polyline points="15 3 21 3 21 9" /><line
												x1="10"
												y1="14"
												x2="21"
												y2="3"
											/></svg
										>
									</a>
								{/if}
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									class="icon-link"
									aria-label="GitHub repo"
									onclick={(e) => e.stopPropagation()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="currentColor"
										><path
											d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
										/></svg
									>
								</a>
							</div>
						</div>

						<p class="card-desc">{project.description}</p>

						<div class="card-tags">
							{#each project.tech.slice(0, 4) as tag (tag)}
								<span class="tech-tag">{tag}</span>
							{/each}
							{#if project.tech.length > 4}
								<span class="tech-tag muted">+{project.tech.length - 4}</span>
							{/if}
						</div>
					</div>

					<!-- Glow border on hover -->
					<div class="card-glow" aria-hidden="true"></div>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Modal -->
{#if selectedProject}
	<div
		class="modal-backdrop"
		role="presentation"
		aria-hidden="true"
		onclick={closeModal}
		onkeydown={() => {}}
	>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-label="{selectedProject.title} details"
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
		>
			<button class="modal-close" onclick={closeModal} aria-label="Close modal">✕</button>
			<div class="modal-image">
				<img
					src={selectedProject.image}
					alt="{selectedProject.title} screenshot"
					loading="lazy"
					onerror={(e) => {
						(e.currentTarget as HTMLImageElement).style.display = 'none';
					}}
				/>
			</div>
			<div class="modal-body">
				<div class="modal-cats">
					{#each selectedProject.category as cat (cat)}
						<span class="cat-tag">{cat}</span>
					{/each}
				</div>
				<h3 class="modal-title">{selectedProject.title}</h3>
				<p class="modal-tagline">{selectedProject.tagline}</p>
				<p class="modal-desc">{selectedProject.longDescription}</p>
				<div class="modal-tech">
					{#each selectedProject.tech as tag (tag)}
						<span class="tech-tag">{tag}</span>
					{/each}
				</div>
				<div class="modal-links">
					{#if selectedProject.live}
						<a
							href={selectedProject.live}
							target="_blank"
							rel="noopener noreferrer"
							class="btn-primary"
						>
							Live Demo ↗
						</a>
					{/if}
					<a
						href={selectedProject.github}
						target="_blank"
						rel="noopener noreferrer"
						class="btn-secondary"
					>
						GitHub Repo
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Filters */
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-10, 2.5rem);
	}

	.filter-btn {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--text-secondary);
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		padding: var(--space-2) var(--space-4);
		cursor: pointer;
		transition: all var(--transition-fast);
		letter-spacing: 0.05em;
	}

	.filter-btn:hover,
	.filter-btn.active {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
		color: var(--bg-primary);
	}

	/* Grid */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}

	@media (max-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 600px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Card */
	.project-card {
		position: relative;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		cursor: pointer;
		transition: all var(--transition-base);
		outline: none;
		text-align: left;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0;
		font-family: inherit;
	}

	.project-card:hover,
	.project-card:focus-visible {
		border-color: var(--project-color, var(--accent-primary));
		transform: translateY(-4px);
		box-shadow: 0 0 24px
			color-mix(in srgb, var(--project-color, var(--accent-primary)) 30%, transparent);
	}

	/* Image */
	.card-image {
		position: relative;
		height: 180px;
		background: var(--bg-elevated);
		overflow: hidden;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.project-card:hover .card-image img {
		transform: scale(1.05);
	}

	.card-image-fallback {
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		color: var(--text-tertiary);
		font-size: var(--text-sm);
	}

	.fallback-icon {
		font-size: 2.5rem;
	}

	.featured-badge {
		position: absolute;
		top: var(--space-3);
		right: var(--space-3);
		background: var(--accent-primary);
		color: var(--bg-primary);
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 600;
		padding: 3px 10px;
		border-radius: var(--radius-full);
		letter-spacing: 0.05em;
	}

	/* Card body */
	.card-body {
		padding: var(--space-5);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	.card-title {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.2;
	}

	.card-tagline {
		font-size: var(--text-xs);
		color: var(--project-color, var(--accent-primary));
		font-family: var(--font-mono);
		margin-top: 2px;
	}

	.card-links {
		display: flex;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.icon-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
		text-decoration: none;
	}

	.icon-link:hover {
		border-color: var(--accent-primary);
		color: var(--accent-primary);
	}

	.card-desc {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-4);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
	}

	.tech-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--accent-primary);
		background: rgba(0, 255, 229, 0.07);
		border: 1px solid rgba(0, 255, 229, 0.2);
		border-radius: var(--radius-sm);
		padding: 2px 8px;
	}

	.tech-tag.muted {
		color: var(--text-tertiary);
		background: var(--bg-surface-hover);
		border-color: var(--border);
	}

	/* Card glow */
	.card-glow {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-xl);
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--transition-base);
		background: radial-gradient(
			ellipse at center,
			color-mix(in srgb, var(--project-color, var(--accent-primary)) 5%, transparent) 0%,
			transparent 70%
		);
	}
	.project-card:hover .card-glow {
		opacity: 1;
	}

	/* Modal */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-4);
		animation: scale-in 0.2s ease;
	}

	.modal {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-2xl);
		width: 100%;
		max-width: 680px;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
	}

	.modal-close {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: var(--bg-surface-hover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		width: 32px;
		height: 32px;
		color: var(--text-secondary);
		cursor: pointer;
		z-index: 1;
		font-size: var(--text-base);
		transition: all var(--transition-fast);
	}
	.modal-close:hover {
		border-color: var(--accent-hot);
		color: var(--accent-hot);
	}

	.modal-image {
		height: 200px;
		background: var(--bg-elevated);
		overflow: hidden;
	}
	.modal-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-body {
		padding: var(--space-6);
	}

	.modal-cats {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		margin-bottom: var(--space-3);
	}
	.cat-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		background: rgba(168, 85, 247, 0.1);
		border: 1px solid rgba(168, 85, 247, 0.3);
		color: var(--accent-secondary);
		border-radius: var(--radius-full);
		padding: 2px 10px;
	}

	.modal-title {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-1);
	}
	.modal-tagline {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--accent-primary);
		margin-bottom: var(--space-4);
	}
	.modal-desc {
		color: var(--text-secondary);
		line-height: 1.8;
		margin-bottom: var(--space-5);
		font-size: var(--text-sm);
	}
	.modal-tech {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin-bottom: var(--space-6);
	}

	.modal-links {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		background: var(--accent-primary);
		color: var(--bg-primary);
		font-weight: 600;
		font-size: var(--text-sm);
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: all var(--transition-fast);
	}
	.btn-primary:hover {
		background: var(--accent-secondary);
		color: white;
		transform: translateY(-1px);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		background: transparent;
		color: var(--text-primary);
		font-weight: 600;
		font-size: var(--text-sm);
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		text-decoration: none;
		transition: all var(--transition-fast);
	}
	.btn-secondary:hover {
		border-color: var(--accent-primary);
		color: var(--accent-primary);
		transform: translateY(-1px);
	}
</style>
