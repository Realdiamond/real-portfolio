export interface CommandResult {
	type: 'text' | 'table' | 'list' | 'link' | 'error' | 'success';
	content: string;
	lines?: string[];
}

export const COMMANDS: Record<string, () => CommandResult> = {
	help: () => ({
		type: 'table',
		content: 'Available commands:',
		lines: [
			'  about       — Who is Timilehin?',
			'  skills      — View tech stack',
			'  projects    — Browse all projects',
			'  contact     — Get in touch',
			'  resume      — Download resume',
			'  theme       — Toggle dark/light mode',
			'  clear       — Clear terminal',
			'  sudo hire   — 😏',
			'',
			'Tip: Type "project <1-5>" for project details'
		]
	}),

	about: () => ({
		type: 'text',
		content: '',
		lines: [
			'┌─────────────────────────────────────────────────────┐',
			'│  Timilehin Akinsanmi                                │',
			'│  Staff Frontend Engineer · 6+ Years Experience     │',
			'├─────────────────────────────────────────────────────┤',
			'│  Staff Engineer crafting high-performance,          │',
			'│  accessible, and visually striking web apps.        │',
			'│  From AI platforms to E2E encrypted systems,        │',
			'│  I build software that pushes browser limits.       │',
			'└─────────────────────────────────────────────────────┘',
			'',
			'  📍 Location  →  Nigeria',
			'  📧 Email     →  realdiamonddigital@gmail.com',
			'  🐙 GitHub    →  github.com/Realdiamond',
			'  💼 LinkedIn  →  linkedin.com/in/oluwatimilehin0-akinsanmi1'
		]
	}),

	skills: () => ({
		type: 'list',
		content: 'Tech Stack:',
		lines: [
			'',
			'  ⚡ Frontend   →  React · Next.js · SvelteKit · TypeScript · Vite',
			'  🔧 Backend    →  Node.js · ASP.NET Core · REST APIs · WebSocket',
			'  🤖 AI & Data  →  OpenAI · Qdrant · Semantic Search · Embeddings',
			'  🔐 Security   →  Web Crypto API · AES-GCM · RSA-OAEP · E2E',
			'  🛠️  Tools      →  Git · GitHub · Vercel · Figma · VS Code'
		]
	}),

	projects: () => ({
		type: 'table',
		content: 'Projects:',
		lines: [
			'',
			'┌────────────────────────────────────────────────────┐',
			'│  1. GlazionStudio    — AI for Ceramics & Pottery   │',
			'│  2. SeunBot Pro      — AI Trading Dashboard        │',
			'│  3. SilentKey        — E2E Encrypted Messaging     │',
			'│  4. PageWise AI      — Chrome AI Summarizer        │',
			'│  5. Invoice Manager  — Full Invoice CRUD App       │',
			'└────────────────────────────────────────────────────┘',
			'',
			'  Type "project <number>" for details.'
		]
	}),

	contact: () => ({
		type: 'success',
		content: '',
		lines: [
			'  📧  realdiamonddigital@gmail.com',
			'  🐙  github.com/Realdiamond',
			'  💼  linkedin.com/in/oluwatimilehin0-akinsanmi1',
			'  🐦  x.com/Iam_RealDiamond',
			'',
			'  Or scroll down to the Contact section to send a message!'
		]
	}),

	resume: () => ({
		type: 'success',
		content: 'Opening resume...',
		lines: ['  📄  Downloading resume.pdf...']
	}),

	theme: () => ({
		type: 'success',
		content: 'Theme toggled!',
		lines: ['  🎨  Theme switched successfully.']
	}),

	clear: () => ({
		type: 'text',
		content: '__CLEAR__',
		lines: []
	}),

	'sudo hire': () => ({
		type: 'success',
		content: '',
		lines: [
			'  [sudo] password for timilehin: ••••••••••',
			'',
			'  ✅  Access granted.',
			'  🚀  Excellent choice. Initiating onboarding sequence...',
			'  📧  Send an email to realdiamonddigital@gmail.com',
			'  💬  Or connect on LinkedIn to get started.',
			'',
			'  Warning: Highly skilled developer detected. May cause',
			'  significant improvements to your codebase. 😄'
		]
	})
};

export const PROJECT_DETAILS: Record<number, string[]> = {
	1: [
		'  GlazionStudio — AI for Ceramics & Pottery',
		'  ─────────────────────────────────────────',
		'  AI-powered glaze exploration assistant.',
		'  Tech: React · Vite · TypeScript · ASP.NET Core · Qdrant · OpenAI',
		'  Live: glazion-studio.vercel.app',
		'  Repo: github.com/Realdiamond/GlazionStudio'
	],
	2: [
		'  SeunBot Pro — AI Trading Dashboard',
		'  ───────────────────────────────────',
		'  Advanced AI trading analysis for NGX & Crypto markets.',
		'  Tech: React · TypeScript · AI/ML · Financial APIs',
		'  Live: seunbot-pro.vercel.app',
		'  Repo: github.com/Realdiamond/seunbot-pro'
	],
	3: [
		'  SilentKey — E2E Encrypted Messaging',
		'  ─────────────────────────────────────',
		'  Client-side AES-GCM + RSA-OAEP. Server never sees plaintext.',
		'  Tech: Next.js · TypeScript · Web Crypto API · WebSocket',
		'  Live: silentkey-stage4b.vercel.app',
		'  Repo: github.com/Realdiamond/silentkey-stage4b'
	],
	4: [
		'  PageWise AI — Chrome Extension',
		'  ────────────────────────────────',
		'  Manifest V3 AI page summarizer with structured insights.',
		'  Tech: JavaScript · Chrome APIs · Node.js · OpenAI · MV3',
		'  Distribution: Chrome Extension (not web)',
		'  Repo: github.com/Realdiamond/hng-stage4a-ai-page-summarizer'
	],
	5: [
		'  Invoice Manager — Full-Stack Invoice App',
		'  ──────────────────────────────────────────',
		'  CRUD, status workflow, dark/light theming, custom date picker.',
		'  Tech: React · Vite · CSS Custom Properties · LocalStorage',
		'  Live: invoice-web-app-lime.vercel.app',
		'  Repo: github.com/Realdiamond/invoice-web-app'
	]
};
