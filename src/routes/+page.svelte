<script lang="ts">
	import HeroSection from '$lib/components/hero/HeroSection.svelte';
	import ProjectsSection from '$lib/components/projects/ProjectsSection.svelte';
	import SkillsSection from '$lib/components/skills/SkillsSection.svelte';
	import AboutSection from '$lib/components/about/AboutSection.svelte';
	import ContactSection from '$lib/components/contact/ContactSection.svelte';
</script>

<svelte:head>
	<title>Timilehin Akinsanmi — Frontend Developer</title>
	<meta
		name="description"
		content="Frontend developer with 6+ years of experience engineering performant, accessible, and visually striking web applications. Explore projects, skills, and get in touch."
	/>
</svelte:head>

<HeroSection />
<ProjectsSection />
<SkillsSection />
<AboutSection />
<ContactSection />
