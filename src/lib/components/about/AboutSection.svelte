<script lang="ts">
	import { fadeInOnScroll } from '$lib/utils/animations';

	const timeline = [
		{
			year: '2026–Present',
			role: 'Staff Frontend Engineer & Architect',
			company: 'Freelance / HNG',
			desc: 'Engineering high-scale distributed systems and advanced AI architectures. Mentoring senior devs and defining frontend technical roadmaps.'
		},
		{
			year: '2024',
			role: 'Senior Frontend Developer',
			company: 'Global Solutions',
			desc: 'Led development of enterprise-grade security platforms. Optimized Web Crypto implementations and complex real-time data visualizations.'
		},
		{
			year: '2023',
			role: 'Frontend Developer',
			company: 'Contract Projects',
			desc: 'Delivered end-to-end web applications using React, TypeScript and Next.js. Focused on performance optimization and accessibility.'
		},
		{
			year: '2022',
			role: 'Frontend Developer',
			company: 'Startup Ecosystem',
			desc: 'Built component libraries and design systems. Integrated REST APIs and WebSocket connections for real-time features.'
		},
		{
			year: '2021',
			role: 'Junior Frontend Developer',
			company: 'Early Career',
			desc: 'Started professional development journey with React and vanilla JavaScript. Developed responsive UIs and improved web vitals.'
		}
	];

	const highlights = [
		{ icon: '🚀', label: 'Projects Shipped', value: '25+' },
		{ icon: '🤖', label: 'AI Apps Built', value: '6+' },
		{ icon: '🔐', label: 'Security Focus', value: 'E2E' },
		{ icon: '⚡', label: 'Performance', value: '98+' }
	];
</script>

<section id="about" class="section">
	<div class="container">
		<p class="section-label">About Me</p>
		<h2 class="section-title">The Developer Behind the Code</h2>

		<div class="about-grid">
			<!-- Left: Bio -->
			<div class="about-bio" use:fadeInOnScroll>
				<div class="avatar-container">
					<div class="avatar-ring">
						<div class="avatar-inner">
							<span class="avatar-initials">TA</span>
						</div>
					</div>
					<div class="avatar-badge">
						<span>6+</span>
						<small>years</small>
					</div>
				</div>

				<div class="bio-text">
					<p>
						I'm <strong>Timilehin Akinsanmi</strong>, a Staff Frontend Engineer with over 6 years of
						experience crafting high-performance web applications. My work sits at the intersection
						of <span class="accent">engineering precision</span> and
						<span class="accent">design excellence</span>.
					</p>
					<p>
						I specialize in React, SvelteKit, and TypeScript ecosystems — building everything from
						AI-powered assistants to end-to-end encrypted messaging platforms. I care deeply about
						<span class="accent">performance</span>, <span class="accent">accessibility</span>, and
						the details that make a product feel truly premium.
					</p>
					<p>
						When I'm not writing code, I'm exploring new technologies, contributing to open-source,
						and levelling up my skills. I believe great software is <em>felt</em>, not just used.
					</p>
				</div>

				<!-- Highlight stats -->
				<div class="highlights">
					{#each highlights as h (h.label)}
						<div class="highlight-card">
							<span class="h-icon">{h.icon}</span>
							<span class="h-value">{h.value}</span>
							<span class="h-label">{h.label}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: Timeline -->
			<div class="timeline" use:fadeInOnScroll>
				<h3 class="timeline-heading">Experience Timeline</h3>
				<div class="timeline-list">
					{#each timeline as item, i (item.year)}
						<div class="timeline-item">
							<div class="timeline-marker">
								<div class="marker-dot" style="animation-delay: {i * 150}ms"></div>
								{#if i < timeline.length - 1}
									<div class="marker-line"></div>
								{/if}
							</div>
							<div class="timeline-content">
								<span class="timeline-year">{item.year}</span>
								<h4 class="timeline-role">{item.role}</h4>
								<span class="timeline-company">{item.company}</span>
								<p class="timeline-desc">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-12);
		align-items: start;
	}

	@media (max-width: 900px) {
		.about-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Avatar */
	.avatar-container {
		position: relative;
		width: fit-content;
		margin-bottom: var(--space-6);
	}

	.avatar-ring {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		padding: 3px;
		background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
		animation: spin 8s linear infinite;
	}

	.avatar-inner {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-initials {
		font-family: var(--font-heading);
		font-size: var(--text-2xl);
		font-weight: 700;
		background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.avatar-badge {
		position: absolute;
		bottom: -4px;
		right: -4px;
		background: var(--accent-primary);
		color: var(--bg-primary);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 13px;
		line-height: 1;
		border: 2px solid var(--bg-surface);
	}

	.avatar-badge small {
		font-size: 8px;
		font-weight: 500;
	}

	/* Bio text */
	.bio-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.bio-text p {
		font-size: var(--text-base);
		color: var(--text-secondary);
		line-height: 1.8;
	}
	.bio-text strong {
		color: var(--text-primary);
		font-weight: 600;
	}
	.accent {
		color: var(--accent-primary);
		font-weight: 500;
	}

	/* Highlights */
	.highlights {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-3);
	}

	.highlight-card {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: 4px;
		transition: all var(--transition-fast);
	}

	.highlight-card:hover {
		border-color: var(--accent-primary);
		transform: translateY(-2px);
	}

	.h-icon {
		font-size: 1.5rem;
	}
	.h-value {
		font-family: var(--font-heading);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--accent-primary);
	}
	.h-label {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
	}

	/* Timeline */
	.timeline-heading {
		font-size: var(--text-lg);
		margin-bottom: var(--space-6);
		color: var(--text-primary);
	}

	.timeline-list {
		display: flex;
		flex-direction: column;
	}

	.timeline-item {
		display: flex;
		gap: var(--space-4);
	}

	.timeline-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.marker-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--accent-primary);
		border: 2px solid var(--bg-primary);
		box-shadow: 0 0 10px rgba(0, 255, 229, 0.4);
		flex-shrink: 0;
		margin-top: 4px;
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.marker-line {
		width: 1px;
		flex: 1;
		min-height: 24px;
		background: linear-gradient(to bottom, var(--accent-primary), var(--border));
		margin: 6px 0;
		opacity: 0.4;
	}

	.timeline-content {
		padding-bottom: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.timeline-year {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--accent-primary);
		letter-spacing: 0.1em;
	}

	.timeline-role {
		font-size: var(--text-base);
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.timeline-company {
		font-size: var(--text-xs);
		color: var(--accent-secondary);
		font-family: var(--font-mono);
	}

	.timeline-desc {
		font-size: var(--text-sm);
		color: var(--text-secondary);
		line-height: 1.7;
		margin-top: 4px;
	}
</style>
