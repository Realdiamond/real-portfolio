<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container footer-inner">
		<div class="footer-left">
			<span class="footer-logo">
				<span class="bracket">&lt;</span>T.Akinsanmi<span class="bracket"> /&gt;</span>
			</span>
			<p class="footer-copy">
				© {currentYear} Timilehin Akinsanmi. Built with SvelteKit &amp; ❤️
			</p>
		</div>

		<div class="footer-right">
			<div class="social-links" aria-label="Social links">
				<a
					href="https://github.com/Realdiamond"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="GitHub"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
				</a>

				<a
					href="https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="LinkedIn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/>
					</svg>
				</a>

				<a
					href="https://x.com/Iam_RealDiamond"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="Twitter/X"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						/>
					</svg>
				</a>

				<a href="mailto:realdiamonddigital@gmail.com" class="social-link" aria-label="Email">
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
						<rect width="20" height="16" x="2" y="4" rx="2" /><path
							d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
						/>
					</svg>
				</a>
			</div>

			<p class="footer-tagline">
				<span class="mono">console.log("</span>Always shipping 🚀<span class="mono">")</span>
			</p>
		</div>
	</div>

	<!-- Decorative glow line -->
	<div class="footer-glow" aria-hidden="true"></div>
</footer>

<style>
	.site-footer {
		position: relative;
		border-top: 1px solid var(--border);
		padding: var(--space-8) 0 var(--space-6);
		margin-top: auto;
		overflow: hidden;
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
		flex-wrap: wrap;
	}

	.footer-left {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.footer-logo {
		font-family: var(--font-mono);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--text-primary);
	}

	.bracket {
		color: var(--accent-primary);
	}

	.footer-copy {
		font-size: var(--text-sm);
		color: var(--text-tertiary);
	}

	.footer-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-3);
	}

	.social-links {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		background: var(--bg-surface);
		transition: all var(--transition-fast);
		text-decoration: none;
	}

	.social-link:hover {
		border-color: var(--accent-primary);
		color: var(--accent-primary);
		transform: translateY(-2px);
		box-shadow: var(--glow-cyan);
	}

	.footer-tagline {
		font-size: var(--text-xs);
		color: var(--text-tertiary);
	}

	.mono {
		font-family: var(--font-mono);
		color: var(--accent-secondary);
	}

	.footer-glow {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 40%;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
		opacity: 0.6;
	}

	@media (max-width: 600px) {
		.footer-inner {
			flex-direction: column;
			align-items: flex-start;
		}
		.footer-right {
			align-items: flex-start;
		}
	}
</style>
