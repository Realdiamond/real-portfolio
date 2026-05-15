<script lang="ts">
	import { fadeInOnScroll } from '$lib/utils/animations';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');

	async function handleSubmit() {
		status = 'loading';

		try {
			const res = await fetch('https://formspree.io/f/mvzljlnv', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ name, email, message })
			});

			if (res.ok) {
				status = 'success';
				name = '';
				email = '';
				message = '';
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}

		// Reset to idle after 5 seconds
		setTimeout(() => {
			status = 'idle';
		}, 5000);
	}

	interface ContactLink {
		icon: string;
		label: string;
		value: string;
		href: string;
	}

	const contactLinks: ContactLink[] = [
		{
			icon: '📧',
			label: 'Email',
			value: 'realdiamonddigital@gmail.com',
			href: 'mailto:realdiamonddigital@gmail.com'
		},
		{
			icon: '🐙',
			label: 'GitHub',
			value: 'github.com/Realdiamond',
			href: 'https://github.com/Realdiamond'
		},
		{
			icon: '💼',
			label: 'LinkedIn',
			value: 'linkedin.com/in/oluwatimilehin0-akinsanmi1',
			href: 'https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/'
		},
		{
			icon: '🐦',
			label: 'Twitter/X',
			value: '@Iam_RealDiamond',
			href: 'https://x.com/Iam_RealDiamond'
		}
	];
</script>

<section id="contact" class="section">
	<div class="container">
		<p class="section-label">Get In Touch</p>
		<h2 class="section-title">Let's Build Something Great</h2>
		<p class="section-subtitle">
			Have a project in mind? Whether it's a startup idea, a complex web app, or just a chat — I'm
			always open to new opportunities.
		</p>

		<div class="contact-grid">
			<!-- Left: Contact info -->
			<div class="contact-info" use:fadeInOnScroll>
				<h3 class="info-heading">Contact Info</h3>
				<div class="contact-links">
					{#each contactLinks as link (link.label)}
						<a href={link.href} target="_blank" rel="noopener noreferrer" class="contact-link">
							<span class="link-icon">{link.icon}</span>
							<span class="link-body">
								<span class="link-label">{link.label}</span>
								<span class="link-value">{link.value}</span>
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								class="link-arrow"
								aria-hidden="true"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
								<polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
							</svg>
						</a>
					{/each}
				</div>

				<!-- Availability note -->
				<div class="availability">
					<span class="avail-dot"></span>
					<div>
						<p class="avail-title">Currently Available</p>
						<p class="avail-sub">Open to full-time, freelance & contract roles</p>
					</div>
				</div>
			</div>

			<!-- Right: Form -->
			<div class="contact-form-wrap" use:fadeInOnScroll>
				<form
					class="contact-form"
					onsubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					novalidate
				>
					<div class="form-row">
						<div class="form-group">
							<label for="contact-name">Name</label>
							<input
								id="contact-name"
								type="text"
								placeholder="Your name"
								bind:value={name}
								required
								autocomplete="name"
							/>
						</div>
						<div class="form-group">
							<label for="contact-email">Email</label>
							<input
								id="contact-email"
								type="email"
								placeholder="your@email.com"
								bind:value={email}
								required
								autocomplete="email"
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="contact-message">Message</label>
						<textarea
							id="contact-message"
							placeholder="Tell me about your project..."
							rows="6"
							bind:value={message}
							required
						></textarea>
					</div>

					<button
						type="submit"
						id="contact-submit"
						class="submit-btn"
						disabled={status === 'loading'}
					>
						{#if status === 'loading'}
							<span class="spinner"></span> Sending...
						{:else if status === 'success'}
							<span class="status-icon">✅</span> Message Sent!
						{:else if status === 'error'}
							<span class="status-icon">❌</span> Failed — try email directly
						{:else}
							Send Message
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<line x1="22" y1="2" x2="11" y2="13" /><polygon
									points="22 2 15 22 11 13 2 9 22 2"
								/>
							</svg>
						{/if}
					</button>

					{#if status === 'success'}
						<div class="form-feedback success">
							<p>Thanks! I've received your message and will get back to you within 24 hours.</p>
						</div>
					{/if}
					{#if status === 'error'}
						<div class="form-feedback error">
							<p>
								Something went wrong. Please try again or email me directly at the address on the
								left.
							</p>
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		gap: var(--space-12);
		align-items: start;
	}

	@media (max-width: 900px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Info */
	.info-heading {
		font-size: var(--text-xl);
		margin-bottom: var(--space-6);
		color: var(--text-primary);
	}

	.contact-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-8);
	}

	.contact-link {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		text-decoration: none;
		transition: all var(--transition-fast);
		color: inherit;
	}

	.contact-link:hover {
		border-color: var(--accent-primary);
		transform: translateX(4px);
		box-shadow: var(--glow-cyan);
	}

	.link-icon {
		font-size: 1.4rem;
		flex-shrink: 0;
	}

	.link-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.link-label {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		font-family: var(--font-mono);
	}
	.link-value {
		font-size: var(--text-sm);
		color: var(--text-primary);
		font-weight: 500;
		word-break: break-all;
	}

	.link-arrow {
		color: var(--text-tertiary);
		flex-shrink: 0;
	}
	.contact-link:hover .link-arrow {
		color: var(--accent-primary);
	}

	/* Availability */
	.availability {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		background: rgba(57, 255, 20, 0.05);
		border: 1px solid rgba(57, 255, 20, 0.2);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
	}

	.avail-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--accent-tertiary);
		flex-shrink: 0;
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.avail-title {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--accent-tertiary);
		margin-bottom: 2px;
	}
	.avail-sub {
		font-size: var(--text-xs);
		color: var(--text-secondary);
	}

	/* Form */
	.contact-form-wrap {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-2xl);
		padding: var(--space-8);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	@media (max-width: 560px) {
		.form-row {
			grid-template-columns: 1fr;
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	label {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--text-secondary);
		font-family: var(--font-mono);
	}

	input,
	textarea {
		background: var(--bg-surface-hover);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: var(--space-3) var(--space-4);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--text-primary);
		transition: all var(--transition-fast);
		resize: vertical;
		outline: none;
		width: 100%;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--text-tertiary);
	}

	input:focus,
	textarea:focus {
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 3px rgba(0, 255, 229, 0.1);
		background: var(--bg-elevated);
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		background: var(--accent-primary);
		color: var(--bg-primary);
		font-family: var(--font-body);
		font-weight: 700;
		font-size: var(--text-base);
		padding: var(--space-4) var(--space-8);
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all var(--transition-fast);
		width: 100%;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--accent-secondary);
		color: white;
		transform: translateY(-2px);
		box-shadow: var(--glow-purple);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(0, 0, 0, 0.3);
		border-top-color: var(--bg-primary);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	/* Feedback Messages */
	.form-feedback {
		margin-top: var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		animation: fade-slide-up 0.4s ease forwards;
	}

	.form-feedback.success {
		background: rgba(57, 255, 20, 0.05);
		border: 1px solid rgba(57, 255, 20, 0.2);
		color: var(--accent-tertiary);
	}

	.form-feedback.error {
		background: rgba(255, 0, 110, 0.05);
		border: 1px solid rgba(255, 0, 110, 0.2);
		color: var(--accent-hot);
	}
</style>
