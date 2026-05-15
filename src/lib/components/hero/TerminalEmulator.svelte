<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { COMMANDS, PROJECT_DETAILS } from '$lib/data/commands';

	interface HistoryEntry {
		type: 'input' | 'output' | 'error' | 'success';
		lines: string[];
	}

	let input = $state('');
	let history = $state<HistoryEntry[]>([]);
	let commandHistory: string[] = [];
	let historyIndex = -1;
	let inputEl: HTMLInputElement;
	let terminalBody: HTMLDivElement;
	let focused = $state(false);

	const WELCOME: string[] = [
		'  ████████╗██╗███╗   ███╗██╗██╗     ███████╗██╗  ██╗██╗███╗   ██╗',
		'  ╚══██╔══╝██║████╗ ████║██║██║     ██╔════╝██║  ██║██║████╗  ██║',
		'     ██║   ██║██╔████╔██║██║██║     █████╗  ███████║██║██╔██╗ ██║',
		'     ██║   ██║██║╚██╔╝██║██║██║     ██╔══╝  ██╔══██║██║██║╚██╗██║',
		'     ██║   ██║██║ ╚═╝ ██║██║███████╗███████╗██║  ██║██║██║ ╚████║',
		'     ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝',
		'',
		"  Welcome to Timilehin's interactive portfolio terminal.",
		"  Type 'help' to see available commands.",
		''
	];

	onMount(() => {
		history = [{ type: 'output', lines: WELCOME }];
		setTimeout(() => inputEl?.focus(), 300);
	});

	async function scrollToBottom() {
		await tick();
		if (terminalBody) {
			terminalBody.scrollTop = terminalBody.scrollHeight;
		}
	}

	async function handleSubmit() {
		const cmd = input.trim().toLowerCase();
		if (!cmd) return;

		history = [...history, { type: 'input', lines: [cmd] }];
		commandHistory = [cmd, ...commandHistory].slice(0, 50);
		historyIndex = -1;
		input = '';

		await tick();

		// Handle "project N" command
		const projectMatch = cmd.match(/^project\s+(\d)$/);
		if (projectMatch) {
			const n = parseInt(projectMatch[1]);
			if (PROJECT_DETAILS[n]) {
				history = [...history, { type: 'output', lines: ['', ...PROJECT_DETAILS[n], ''] }];
			} else {
				history = [
					...history,
					{
						type: 'error',
						lines: [`  Error: project ${n} not found. Type 'projects' to list all.`]
					}
				];
			}
			await scrollToBottom();
			return;
		}

		// Handle "sudo hire"
		if (cmd === 'sudo hire') {
			const result = COMMANDS['sudo hire']();
			history = [...history, { type: 'success', lines: ['', ...result.lines!, ''] }];
			await scrollToBottom();
			return;
		}

		if (COMMANDS[cmd]) {
			const result = COMMANDS[cmd]();
			if (result.content === '__CLEAR__') {
				history = [{ type: 'output', lines: WELCOME }];
				await scrollToBottom();
				return;
			}
			if (cmd === 'resume') {
				window.open('/assets/resume.pdf', '_blank');
			}
			if (cmd === 'theme') {
				theme.toggle();
			}
			const type =
				result.type === 'error' ? 'error' : result.type === 'success' ? 'success' : 'output';
			history = [...history, { type, lines: ['', ...(result.lines ?? []), ''] }];
		} else {
			history = [
				...history,
				{
					type: 'error',
					lines: [`  command not found: ${cmd}`, `  Type 'help' to see available commands.`]
				}
			];
		}

		await scrollToBottom();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				input = commandHistory[historyIndex];
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				input = commandHistory[historyIndex];
			} else {
				historyIndex = -1;
				input = '';
			}
		}
	}

	function focusInput() {
		inputEl?.focus();
	}
</script>

<div
	class="terminal"
	class:focused
	role="region"
	aria-label="Interactive terminal"
	onclick={focusInput}
	onkeydown={() => {}}
	tabindex="-1"
>
	<!-- Title bar -->
	<div class="terminal-titlebar">
		<div class="terminal-dots">
			<span class="dot dot-red"></span>
			<span class="dot dot-amber"></span>
			<span class="dot dot-green"></span>
		</div>
		<span class="terminal-title">timilehin@portfolio:~</span>
		<div class="terminal-actions">
			<span class="terminal-badge">bash</span>
		</div>
	</div>

	<!-- Body -->
	<div class="terminal-body" bind:this={terminalBody}>
		{#each history as entry, i (i)}
			{#if entry.type === 'input'}
				<div class="terminal-line input-line">
					<span class="prompt">
						<span class="prompt-user">timilehin</span><span class="prompt-at">@</span><span
							class="prompt-host">portfolio</span
						><span class="prompt-sep">:</span><span class="prompt-path">~</span><span
							class="prompt-dollar">$</span
						>
					</span>
					<span class="cmd-text">{entry.lines[0]}</span>
				</div>
			{:else}
				<div
					class="terminal-output"
					class:error={entry.type === 'error'}
					class:success={entry.type === 'success'}
				>
					{#each entry.lines as line, j (j)}
						<div class="output-line">{line}</div>
					{/each}
				</div>
			{/if}
		{/each}

		<!-- Input row -->
		<div class="terminal-line input-row">
			<span class="prompt">
				<span class="prompt-user">timilehin</span><span class="prompt-at">@</span><span
					class="prompt-host">portfolio</span
				><span class="prompt-sep">:</span><span class="prompt-path">~</span><span
					class="prompt-dollar">$</span
				>
			</span>
			<input
				bind:this={inputEl}
				bind:value={input}
				onkeydown={(e) => {
					if (e.key === 'Enter') handleSubmit();
					else handleKeydown(e);
				}}
				onfocus={() => (focused = true)}
				onblur={() => (focused = false)}
				class="terminal-input"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
				aria-label="Terminal input"
				placeholder=""
			/>
			<span class="cursor animate-blink" aria-hidden="true"></span>
		</div>
	</div>
</div>

<style>
	.terminal {
		background: #0d0d14;
		border: 1px solid rgba(0, 255, 229, 0.2);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow:
			0 0 0 1px rgba(0, 255, 229, 0.05),
			0 20px 60px rgba(0, 0, 0, 0.5),
			var(--glow-cyan);
		cursor: text;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	/* Title bar */
	.terminal-titlebar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-3) var(--space-4);
		background: #111118;
		border-bottom: 1px solid rgba(0, 255, 229, 0.1);
	}

	.terminal-dots {
		display: flex;
		gap: 6px;
	}
	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	.dot-red {
		background: #ff5f56;
	}
	.dot-amber {
		background: #ffbd2e;
	}
	.dot-green {
		background: #27c93f;
	}

	.terminal-title {
		font-size: var(--text-xs);
		color: #666;
		letter-spacing: 0.05em;
	}

	.terminal-badge {
		font-size: 10px;
		color: var(--accent-primary);
		background: rgba(0, 255, 229, 0.1);
		padding: 2px 8px;
		border-radius: var(--radius-full);
		border: 1px solid rgba(0, 255, 229, 0.2);
	}

	/* Body */
	.terminal-body {
		padding: var(--space-4);
		height: 340px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 255, 229, 0.3) transparent;
	}

	.terminal-body::-webkit-scrollbar {
		width: 4px;
	}
	.terminal-body::-webkit-scrollbar-thumb {
		background: rgba(0, 255, 229, 0.3);
		border-radius: 2px;
	}

	/* Lines */
	.terminal-line {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
		margin-bottom: 2px;
	}

	.input-row {
		position: relative;
		margin-top: var(--space-1);
	}

	/* Prompt */
	.prompt {
		white-space: nowrap;
	}
	.prompt-user {
		color: #00ffe5;
	}
	.prompt-at {
		color: #666;
	}
	.prompt-host {
		color: #a855f7;
	}
	.prompt-sep {
		color: #666;
	}
	.prompt-path {
		color: #39ff14;
	}
	.prompt-dollar {
		color: #e4e4e7;
		margin-left: 2px;
	}

	/* Input */
	.terminal-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #e4e4e7;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		caret-color: transparent;
		width: 100%;
		min-width: 0;
	}

	.cursor {
		width: 8px;
		height: 16px;
		background: var(--accent-primary);
		border-radius: 1px;
		display: inline-block;
		vertical-align: text-bottom;
		flex-shrink: 0;
	}

	.cmd-text {
		color: #e4e4e7;
	}

	/* Output */
	.terminal-output {
		margin-bottom: 2px;
	}
	.output-line {
		white-space: pre-wrap;
		word-break: break-all;
		color: #9ca3af;
		line-height: 1.5;
	}

	.terminal-output.error .output-line {
		color: #ff006e;
	}
	.terminal-output.success .output-line {
		color: #39ff14;
	}

	/* Welcome ASCII art */
	.terminal-output:first-child .output-line:nth-child(-n + 6) {
		color: var(--accent-primary);
		font-size: 10px;
	}

	@media (max-width: 480px) {
		.terminal-output:first-child .output-line:nth-child(-n + 6) {
			font-size: 6px;
			line-height: 1.2;
		}
		.terminal-body {
			padding: var(--space-3);
		}
	}
</style>
