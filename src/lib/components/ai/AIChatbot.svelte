<script lang="ts">
	import { tick } from 'svelte';

	interface Message {
		role: 'user' | 'ai';
		text: string;
		timestamp: Date;
	}

	let isOpen = $state(false);
	let input = $state('');
	let messages = $state<Message[]>([
		{
			role: 'ai',
			text: "Hi! 👋 I'm Tim's AI assistant. Ask me anything about his projects, skills, or how to get in touch!",
			timestamp: new Date()
		}
	]);
	let isTyping = $state(false);
	let chatBody = $state<HTMLDivElement | null>(null);

	const KB: { patterns: RegExp[]; response: string }[] = [
		{
			patterns: [/who are you|about tim|tell me about|who is tim/i],
			response:
				'Timilehin Akinsanmi is a Staff Frontend Engineer & Architect with 6+ years of experience building performant, accessible, and visually striking web applications. He specializes in React, SvelteKit, and TypeScript, with a strong focus on AI-powered tools and security-first products.'
		},
		{
			patterns: [/project|built|portfolio|work|showcase/i],
			response:
				'Tim has built 25+ projects, including these featured ones:\n\n🚀 GlazionStudio — AI for ceramics & pottery\n📈 SeunBot Pro — AI trading dashboard\n🔐 SilentKey — E2E encrypted messaging\n🧩 PageWise AI — Chrome AI summarizer\n📋 Invoice Manager — Full invoice CRUD app\n\nClick any project card to learn more!'
		},
		{
			patterns: [/skill|tech|stack|language|framework|tool/i],
			response:
				"Tim's tech stack includes:\n\n⚡ Frontend: React, Next.js, SvelteKit, TypeScript\n🔧 Backend: Node.js, ASP.NET Core, REST APIs\n🤖 AI: OpenAI API, Qdrant, Semantic Search\n🔐 Security: Web Crypto API, AES-GCM, RSA-OAEP\n🛠️ Tools: Git, Vercel, Figma, VS Code"
		},
		{
			patterns: [/contact|email|reach|hire|work with|available/i],
			response:
				'Tim is currently available for freelance and full-time opportunities! You can reach him at:\n\n📧 realdiamonddigital@gmail.com\n💼 linkedin.com/in/oluwatimilehin0-akinsanmi1\n🐙 github.com/Realdiamond\n\nOr scroll to the Contact section to send a message directly!'
		},
		{
			patterns: [/experience|year|how long|senior|junior/i],
			response:
				'Tim has 6+ years of professional frontend development experience, spanning freelance projects, startup ecosystems, and enterprise-level applications. He currently works as a Staff Engineer and Architect.'
		},
		{
			patterns: [/glazion|ceramic|pottery|glaze/i],
			response:
				'GlazionStudio is an AI-powered assistant for ceramic artists. It uses OpenAI for intelligent Q&A, Qdrant for semantic search over a curated ceramics knowledge base, and ASP.NET Core for the backend. Built with React + Vite + TypeScript.\n\nLive: glazion-studio.vercel.app'
		},
		{
			patterns: [/seunbot|trading|crypto|market|finance/i],
			response:
				'SeunBot Pro is an advanced AI trading analysis dashboard built for NGX and Cryptocurrency markets. It features real-time data visualization, AI-driven signals, and a modular component architecture built with React and TypeScript.'
		},
		{
			patterns: [/silentkey|encrypt|secure|privacy|message/i],
			response:
				'SilentKey is a privacy-first messaging app where all encryption happens client-side using the Web Crypto API. It uses AES-GCM for symmetric encryption and RSA-OAEP for key exchange — the server never sees plaintext. Built with Next.js + TypeScript + WebSocket.'
		},
		{
			patterns: [/pagewise|chrome|extension|summarize|summary/i],
			response:
				'PageWise AI is a Manifest V3 Chrome Extension that summarizes any web page using OpenAI. It extracts content, sends it through a secure Node.js proxy to OpenAI, and returns structured summaries with bullet points, reading time, and word count.'
		},
		{
			patterns: [/invoice|billing|crud|management/i],
			response:
				'Invoice Manager is a full-featured invoice management app built with React + Vite. It has complete CRUD, draft/pending/paid status flow, a custom date picker, dark/light theming via CSS Custom Properties, and LocalStorage persistence.'
		},
		{
			patterns: [/resume|cv|download/i],
			response:
				"You can download Tim's resume directly from the portfolio! Click the 'Download CV' button in the hero section, or type 'resume' in the interactive terminal. 📄"
		},
		{
			patterns: [/hello|hi|hey|sup|greet/i],
			response:
				"Hey there! 👋 Great to meet you. Feel free to ask me anything about Timilehin's work, skills, or how to get in touch!"
		},
		{
			patterns: [/thanks|thank you|appreciate|helpful/i],
			response:
				"You're welcome! 😊 Don't hesitate to reach out to Tim directly if you'd like to work together — he's always open to exciting new projects."
		}
	];

	function getResponse(userInput: string): string {
		const lower = userInput.toLowerCase().trim();
		for (const entry of KB) {
			if (entry.patterns.some((p) => p.test(lower))) {
				return entry.response;
			}
		}
		return "I'm not sure about that one! For anything specific, you can reach Tim directly at realdiamonddigital@gmail.com or check out the Contact section below. 📬";
	}

	async function scrollToBottom() {
		await tick();
		if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
	}

	async function sendMessage() {
		const text = input.trim();
		if (!text) return;

		messages = [...messages, { role: 'user', text, timestamp: new Date() }];
		input = '';
		isTyping = true;
		await scrollToBottom();

		setTimeout(
			async () => {
				const response = getResponse(text);
				isTyping = false;
				messages = [...messages, { role: 'ai', text: response, timestamp: new Date() }];
				await scrollToBottom();
			},
			800 + Math.random() * 400
		);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	function formatTime(d: Date) {
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
</script>

<!-- Floating Button -->
<div class="chatbot-wrap">
	{#if !isOpen}
		<button
			class="chat-fab"
			onclick={() => (isOpen = true)}
			aria-label="Open AI assistant"
			id="open-chatbot"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path
					d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
				/>
				<path d="M8 10h8M8 14h5" />
			</svg>
			<span class="fab-label">Ask AI</span>
			<span class="fab-ping" aria-hidden="true"></span>
		</button>
	{:else}
		<!-- Chat Window -->
		<div class="chat-window" role="dialog" aria-label="AI Portfolio Assistant" aria-modal="false">
			<!-- Header -->
			<div class="chat-header">
				<div class="chat-header-left">
					<div class="ai-avatar">
						<span>AI</span>
						<span class="ai-online" aria-hidden="true"></span>
					</div>
					<div>
						<p class="chat-name">Portfolio Assistant</p>
						<p class="chat-status">Ask me anything ✨</p>
					</div>
				</div>
				<button class="chat-close" onclick={() => (isOpen = false)} aria-label="Close chat"
					>✕</button
				>
			</div>

			<!-- Messages -->
			<div class="chat-body" bind:this={chatBody} aria-live="polite">
				{#each messages as msg, i (i)}
					<div class="msg-row" class:user={msg.role === 'user'}>
						{#if msg.role === 'ai'}
							<div class="msg-avatar">AI</div>
						{/if}
						<div class="msg-bubble" class:user-bubble={msg.role === 'user'}>
							<p class="msg-text">{msg.text}</p>
							<span class="msg-time">{formatTime(msg.timestamp)}</span>
						</div>
					</div>
				{/each}

				{#if isTyping}
					<div class="msg-row">
						<div class="msg-avatar">AI</div>
						<div class="msg-bubble typing-bubble">
							<span class="typing-dot"></span>
							<span class="typing-dot"></span>
							<span class="typing-dot"></span>
						</div>
					</div>
				{/if}
			</div>

			<!-- Suggestions -->
			<div class="chat-suggestions">
				{#each ['What projects has Tim built?', "What's his tech stack?", 'How can I hire him?'] as s (s)}
					<button
						class="suggestion-chip"
						onclick={() => {
							input = s;
							sendMessage();
						}}>{s}</button
					>
				{/each}
			</div>

			<!-- Input -->
			<div class="chat-input-row">
				<input
					bind:value={input}
					onkeydown={handleKeydown}
					placeholder="Ask about Tim's work..."
					class="chat-input"
					aria-label="Chat message input"
					id="chat-input"
				/>
				<button
					class="send-btn"
					onclick={sendMessage}
					disabled={!input.trim()}
					aria-label="Send message"
					id="chat-send"
				>
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
						<line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.chatbot-wrap {
		position: fixed;
		bottom: var(--space-6);
		right: var(--space-6);
		z-index: var(--z-modal);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-3);
	}

	/* FAB */
	.chat-fab {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
		color: var(--bg-primary);
		border: none;
		border-radius: var(--radius-full);
		padding: var(--space-3) var(--space-5);
		cursor: pointer;
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 600;
		box-shadow: 0 4px 20px rgba(0, 255, 229, 0.3);
		transition: all var(--transition-fast);
		position: relative;
	}

	.chat-fab:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px rgba(0, 255, 229, 0.4);
	}

	.fab-label {
		white-space: nowrap;
	}

	.fab-ping {
		position: absolute;
		top: -2px;
		right: -2px;
		width: 12px;
		height: 12px;
		background: var(--accent-tertiary);
		border-radius: 50%;
		border: 2px solid var(--bg-primary);
		animation: pulse-glow 2s ease-in-out infinite;
	}

	/* Window */
	.chat-window {
		width: 360px;
		max-height: 520px;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-2xl);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.5),
			var(--glow-cyan);
		animation: scale-in 0.2s ease;
	}

	@media (max-width: 480px) {
		.chat-window {
			width: calc(100vw - 2rem);
		}
		.chatbot-wrap {
			right: var(--space-4);
			bottom: var(--space-4);
		}
	}

	/* Header */
	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4);
		background: linear-gradient(135deg, rgba(0, 255, 229, 0.08), rgba(168, 85, 247, 0.08));
		border-bottom: 1px solid var(--border);
	}

	.chat-header-left {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.ai-avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--bg-primary);
		position: relative;
	}

	.ai-online {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 10px;
		height: 10px;
		background: var(--accent-tertiary);
		border-radius: 50%;
		border: 2px solid var(--bg-surface);
	}

	.chat-name {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text-primary);
	}
	.chat-status {
		font-size: var(--text-xs);
		color: var(--accent-primary);
		font-family: var(--font-mono);
	}

	.chat-close {
		background: none;
		border: none;
		color: var(--text-tertiary);
		cursor: pointer;
		font-size: var(--text-base);
		width: 28px;
		height: 28px;
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chat-close:hover {
		background: var(--bg-surface-hover);
		color: var(--accent-hot);
	}

	/* Body */
	.chat-body {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		min-height: 200px;
		max-height: 280px;
		scrollbar-width: thin;
		scrollbar-color: var(--border) transparent;
	}

	/* Messages */
	.msg-row {
		display: flex;
		align-items: flex-end;
		gap: var(--space-2);
	}
	.msg-row.user {
		flex-direction: row-reverse;
	}

	.msg-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 9px;
		font-weight: 700;
		color: var(--bg-primary);
		flex-shrink: 0;
	}

	.msg-bubble {
		max-width: 78%;
		background: var(--bg-surface-hover);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		border-bottom-left-radius: 4px;
		padding: var(--space-3) var(--space-4);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.user-bubble {
		background: rgba(0, 255, 229, 0.08);
		border-color: rgba(0, 255, 229, 0.2);
		border-bottom-left-radius: var(--radius-lg);
		border-bottom-right-radius: 4px;
	}

	.msg-text {
		font-size: var(--text-sm);
		color: var(--text-primary);
		line-height: 1.6;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.msg-time {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-tertiary);
		align-self: flex-end;
	}

	/* Typing */
	.typing-bubble {
		flex-direction: row !important;
		align-items: center !important;
		gap: 5px !important;
		padding: var(--space-3) var(--space-4) !important;
		min-width: 60px;
	}

	.typing-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent-primary);
		animation: blink 1.2s ease-in-out infinite;
	}
	.typing-dot:nth-child(2) {
		animation-delay: 0.2s;
	}
	.typing-dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	/* Suggestions */
	.chat-suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		padding: var(--space-2) var(--space-4);
		border-top: 1px solid var(--border);
	}

	.suggestion-chip {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--accent-primary);
		background: rgba(0, 255, 229, 0.06);
		border: 1px solid rgba(0, 255, 229, 0.2);
		border-radius: var(--radius-full);
		padding: 3px 10px;
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.suggestion-chip:hover {
		background: rgba(0, 255, 229, 0.15);
		transform: translateY(-1px);
	}

	/* Input */
	.chat-input-row {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		border-top: 1px solid var(--border);
		background: var(--bg-surface);
	}

	.chat-input {
		flex: 1;
		background: var(--bg-surface-hover);
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		padding: var(--space-2) var(--space-4);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--text-primary);
		outline: none;
		transition: all var(--transition-fast);
	}

	.chat-input:focus {
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 2px rgba(0, 255, 229, 0.1);
	}

	.chat-input::placeholder {
		color: var(--text-tertiary);
	}

	.send-btn {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: var(--accent-primary);
		border: none;
		color: var(--bg-primary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
		flex-shrink: 0;
	}

	.send-btn:hover:not(:disabled) {
		background: var(--accent-secondary);
		transform: scale(1.05);
	}

	.send-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
</style>
