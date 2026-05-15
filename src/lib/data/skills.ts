export interface Skill {
	name: string;
	level: number; // 0-100
	icon?: string;
}

export interface SkillCategory {
	id: string;
	label: string;
	color: string;
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		id: 'frontend',
		label: 'Frontend',
		color: '#00FFE5',
		skills: [
			{ name: 'React', level: 95 },
			{ name: 'SvelteKit', level: 80 },
			{ name: 'Next.js', level: 88 },
			{ name: 'TypeScript', level: 90 },
			{ name: 'JavaScript', level: 95 },
			{ name: 'HTML5', level: 98 },
			{ name: 'CSS3', level: 95 },
			{ name: 'Tailwind CSS', level: 90 },
			{ name: 'Vite', level: 85 }
		]
	},
	{
		id: 'backend',
		label: 'Backend',
		color: '#A855F7',
		skills: [
			{ name: 'Node.js', level: 80 },
			{ name: 'ASP.NET Core', level: 72 },
			{ name: 'REST APIs', level: 88 },
			{ name: 'WebSocket', level: 78 }
		]
	},
	{
		id: 'ai',
		label: 'AI & Data',
		color: '#FFB800',
		skills: [
			{ name: 'OpenAI API', level: 85 },
			{ name: 'Qdrant', level: 75 },
			{ name: 'Semantic Search', level: 78 },
			{ name: 'GPT Integration', level: 85 }
		]
	},
	{
		id: 'security',
		label: 'Security',
		color: '#39FF14',
		skills: [
			{ name: 'Web Crypto API', level: 82 },
			{ name: 'AES-GCM', level: 80 },
			{ name: 'RSA-OAEP', level: 78 },
			{ name: 'E2E Encryption', level: 82 }
		]
	},
	{
		id: 'tools',
		label: 'Tools & Platform',
		color: '#FF006E',
		skills: [
			{ name: 'Git & GitHub', level: 92 },
			{ name: 'Vercel', level: 90 },
			{ name: 'Figma', level: 78 },
			{ name: 'Chrome Extension APIs', level: 82 },
			{ name: 'VS Code', level: 95 }
		]
	}
];
