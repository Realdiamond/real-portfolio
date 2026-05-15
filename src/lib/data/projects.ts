export interface Project {
	id: number;
	title: string;
	tagline: string;
	description: string;
	longDescription: string;
	tech: string[];
	live: string | null;
	github: string;
	image: string;
	category: string[];
	featured: boolean;
	color: string;
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'GlazionStudio',
		tagline: 'AI for Ceramics & Pottery',
		description:
			'AI-powered assistant for ceramic artists — intelligent Q&A, recipe-to-image generation, and semantic search.',
		longDescription:
			'GlazionStudio is an AI-powered assistant for ceramic artists, potters, and hobbyists. It delivers a core Q&A system with a curated ceramic knowledge base, recipe-to-image generation using OpenAI, and semantic search via Qdrant vector database.',
		tech: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'ASP.NET Core', 'Qdrant', 'OpenAI'],
		live: 'https://glazion-studio.vercel.app',
		github: 'https://github.com/Realdiamond/GlazionStudio',
		image: '/assets/projects/glazion-studio.png',
		category: ['AI', 'Full-Stack'],
		featured: true,
		color: '#00FFE5'
	},
	{
		id: 2,
		title: 'SeunBot Pro',
		tagline: 'AI Trading Analysis Dashboard',
		description:
			'Advanced AI-powered trading analysis dashboard with modular components for NGX and Crypto markets.',
		longDescription:
			'SeunBot Pro is a sophisticated AI trading dashboard for NGX and Crypto markets. It features real-time market data visualization, AI-driven analysis components, portfolio tracking, and intelligent market signals.',
		tech: ['React', 'TypeScript', 'AI/ML', 'Financial APIs', 'Chart.js'],
		live: 'https://seunbot-pro.vercel.app',
		github: 'https://github.com/Realdiamond/seunbot-pro',
		image: '/assets/projects/seunbot-pro.png',
		category: ['AI', 'Dashboard'],
		featured: true,
		color: '#A855F7'
	},
	{
		id: 3,
		title: 'SilentKey',
		tagline: 'End-to-End Encrypted Messaging',
		description:
			'Secure messaging with client-side AES-GCM + RSA-OAEP encryption. The server never sees plaintext.',
		longDescription:
			'SilentKey implements military-grade encryption entirely on the client side using the Web Crypto API. AES-GCM symmetric encryption and RSA-OAEP key exchange ensure every message is encrypted in the browser before transmission.',
		tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Crypto API', 'WebSocket'],
		live: 'https://silentkey-stage4b.vercel.app',
		github: 'https://github.com/Realdiamond/silentkey-stage4b',
		image: '/assets/projects/silentkey.png',
		category: ['Security', 'Full-Stack'],
		featured: true,
		color: '#39FF14'
	},
	{
		id: 4,
		title: 'PageWise AI',
		tagline: 'AI Page Summarizer Chrome Extension',
		description:
			'Manifest V3 Chrome Extension that generates structured AI summaries with bullet points, insights, and reading time.',
		longDescription:
			'PageWise AI is a Manifest V3 Chrome Extension that intelligently summarizes any web page. It routes content through a secure backend proxy to OpenAI, returning structured summaries with key insights, bullet points, and reading time estimates.',
		tech: ['JavaScript', 'Chrome Extension APIs', 'Node.js', 'OpenAI API', 'Manifest V3'],
		live: null,
		github: 'https://github.com/Realdiamond/hng-stage4a-ai-page-summarizer',
		image: '/assets/projects/pagewise-ai.png',
		category: ['AI', 'Browser Extension'],
		featured: false,
		color: '#FFB800'
	},
	{
		id: 5,
		title: 'Invoice Manager',
		tagline: 'Full-Stack Invoice Management',
		description:
			'Responsive invoice app with CRUD, status flow, dark/light theming, filtering, and LocalStorage persistence.',
		longDescription:
			'A comprehensive invoice management app with full CRUD, draft/pending/paid workflow, and rich filtering. Built with React and Vite, featuring a custom date picker, CSS Custom Property theming, and LocalStorage persistence.',
		tech: ['React', 'Vite', 'CSS Custom Properties', 'LocalStorage'],
		live: 'https://invoice-web-app-lime.vercel.app',
		github: 'https://github.com/Realdiamond/invoice-web-app',
		image: '/assets/projects/invoice-app.png',
		category: ['Frontend', 'Productivity'],
		featured: false,
		color: '#FF006E'
	}
];

export const projectCategories = ['All', 'AI', 'Full-Stack', 'Security', 'Frontend', 'Dashboard'];
