import { browser } from '$app/environment';

/**
 * Intersection Observer — trigger callback when element enters viewport
 */
export function onVisible(
	node: Element,
	callback: (entry: IntersectionObserverEntry) => void,
	options?: IntersectionObserverInit
): () => void {
	if (!browser) return () => {};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					callback(entry);
				}
			});
		},
		{ threshold: 0.15, ...options }
	);

	observer.observe(node);
	return () => observer.disconnect();
}

/**
 * Svelte action: fade-in on scroll
 */
export function fadeInOnScroll(node: HTMLElement): { destroy(): void } {
	node.classList.add('fade-in');

	const cleanup = onVisible(node, () => {
		node.classList.add('visible');
	});

	return { destroy: cleanup };
}

/**
 * Staggered reveal for lists of children
 */
export function staggerReveal(container: HTMLElement, staggerMs = 100): { destroy(): void } {
	const children = Array.from(container.children) as HTMLElement[];

	children.forEach((child, i) => {
		child.style.opacity = '0';
		child.style.transform = 'translateY(24px)';
		child.style.transition = `opacity 0.5s ease ${i * staggerMs}ms, transform 0.5s ease ${i * staggerMs}ms`;
	});

	const cleanup = onVisible(container, () => {
		children.forEach((child) => {
			child.style.opacity = '1';
			child.style.transform = 'translateY(0)';
		});
	});

	return { destroy: cleanup };
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
