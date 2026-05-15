import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (browser) {
	gsap.registerPlugin(ScrollTrigger);
}

/**
 * Svelte action: fade-in on scroll using GSAP
 */
export function fadeInOnScroll(node: HTMLElement): { destroy(): void } {
	if (!browser) return { destroy: () => {} };

	const anim = gsap.fromTo(
		node,
		{ opacity: 0, y: 30 },
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: node,
				start: 'top 85%',
				toggleActions: 'play none none none'
			}
		}
	);

	return {
		destroy() {
			anim.kill();
		}
	};
}

/**
 * Staggered reveal for lists of children using GSAP
 */
export function staggerReveal(container: HTMLElement, staggerMs = 0.1): { destroy(): void } {
	if (!browser) return { destroy: () => {} };

	const children = container.children;
	const anim = gsap.fromTo(
		children,
		{ opacity: 0, y: 20 },
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: staggerMs,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: container,
				start: 'top 85%'
			}
		}
	);

	return {
		destroy() {
			anim.kill();
		}
	};
}

/**
 * Debounce utility
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout>;
	return ((...args: unknown[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	}) as T;
}

/**
 * Throttle utility
 */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number): T {
	let inThrottle = false;
	return ((...args: unknown[]) => {
		if (!inThrottle) {
			fn(...args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	}) as T;
}

/**
 * Typewriter effect — returns cleanup
 */
export function typewriter(
	element: HTMLElement,
	text: string,
	speed = 35,
	onDone?: () => void
): () => void {
	let i = 0;
	element.textContent = '';

	const interval = setInterval(() => {
		if (i < text.length) {
			element.textContent += text[i];
			i++;
		} else {
			clearInterval(interval);
			onDone?.();
		}
	}, speed);

	return () => clearInterval(interval);
}
