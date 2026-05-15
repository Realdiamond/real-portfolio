<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (!browser) return;

		const ctx = canvas.getContext('2d')!;
		let animId: number;
		let w = 0,
			h = 0;

		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			size: number;
			opacity: number;
			color: string;
		}

		const COLORS = ['#00FFE5', '#A855F7', '#39FF14', '#FFB800'];
		const particles: Particle[] = [];
		const COUNT = 80;

		function resize() {
			w = canvas.width = canvas.offsetWidth;
			h = canvas.height = canvas.offsetHeight;
		}

		function spawn(): Particle {
			return {
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				size: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.5 + 0.1,
				color: COLORS[Math.floor(Math.random() * COLORS.length)]
			};
		}

		resize();
		for (let i = 0; i < COUNT; i++) particles.push(spawn());

		function draw() {
			ctx.clearRect(0, 0, w, h);

			// Draw connections
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) {
						ctx.beginPath();
						ctx.strokeStyle = `rgba(0, 255, 229, ${0.08 * (1 - dist / 120)})`;
						ctx.lineWidth = 0.5;
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			// Draw particles
			particles.forEach((p) => {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle =
					p.color +
					Math.round(p.opacity * 255)
						.toString(16)
						.padStart(2, '0');
				ctx.fill();

				p.x += p.vx;
				p.y += p.vy;

				if (p.x < -10) p.x = w + 10;
				if (p.x > w + 10) p.x = -10;
				if (p.y < -10) p.y = h + 10;
				if (p.y > h + 10) p.y = -10;
			});

			animId = requestAnimationFrame(draw);
		}

		draw();

		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		return () => {
			cancelAnimationFrame(animId);
			ro.disconnect();
		};
	});
</script>

<canvas bind:this={canvas} class="particle-canvas" aria-hidden="true"></canvas>

<!-- Grid overlay -->
<div class="grid-overlay" aria-hidden="true"></div>

<style>
	.particle-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background-image:
			linear-gradient(rgba(0, 255, 229, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 255, 229, 0.04) 1px, transparent 1px);
		background-size: 50px 50px;
		animation: grid-pulse 4s ease-in-out infinite;
		mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
	}
</style>
