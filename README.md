# 💎 Timilehin Akinsanmi — Interactive Portfolio

A production-grade, immersive developer portfolio built with **SvelteKit** and **Svelte 5**. This project is engineered to feel like an experience rather than a static page, featuring a futuristic "Cyber Neon" design system, interactive terminal, and AI-driven components.

**Live Demo**: [Your Vercel URL Here]
**Stage**: Frontend Wizards — Stage 5b

---

## 🚀 Key Features

### 1. Interactive Terminal (Hero Section)

- **Interactive Shell**: A fully functional bash-inspired emulator where users can explore projects via commands like `projects`, `about`, or `sudo hire`.
- **ASCII Art**: Custom responsive ASCII welcome message.
- **Command History**: Supports keyboard up/down arrows to cycle through previous commands.

### 2. Design System: "Cyber Neon"

- **Dynamic Theming**: Sophisticated Dark/Light mode support with theme persistence.
- **Fluid Typography**: Uses CSS `clamp()` for perfectly responsive text across all device sizes.
- **Glassmorphism**: High-performance backdrop blurs and semi-transparent surfaces.

### 3. Advanced Interactivity

- **Command Palette (Cmd+K)**: Quick navigation and action menu for power users.
- **AI Portfolio Assistant**: An integrated chatbot to help users navigate my experience and skills.
- **Staggered Reveals**: Smooth entrance animations for all sections using GSAP and Svelte actions.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Static Adapter)
- **State Management**: [Svelte 5 Runes](https://svelte.dev/blog/runes) (`$state`, `$derived`, `$effect`)
- **Animation**: [GSAP](https://greensock.com/gsap/) for complex scroll-driven motion and native Svelte transitions for UI elements.
- **Styling**: Native CSS with a robust CSS Variable design system (No heavy utility frameworks to keep the bundle lean).
- **Icons**: Lucide Svelte & custom SVG components.

---

## 🧪 Technical Decisions

### Animation Philosophy

I chose **GSAP** for the hero and scroll-triggered reveals because of its high-performance ticker and precise control over staggered timelines. For micro-interactions (like button hovers and menu toggles), I utilized **Native Svelte Transitions** to keep the interaction logic simple and the bundle size optimized.

### Performance Optimization

- **Static Generation**: Pre-rendered at build time for instant loading.
- **Image Strategy**: Optimized `.webp` and `.png` assets with lazy loading.
- **Clean Bundle**: Avoided heavy CSS frameworks in favor of a custom-built, lightweight design system based on CSS variables.
- **Font Optimization**: Pre-connected Google Fonts with `display: swap` to prevent layout shifts.

### Accessibility (a11y)

- **Semantic HTML**: Proper use of `<section>`, `<article>`, `<nav>`, and heading hierarchies (`h1`-`h3`).
- **Focus States**: High-visibility focus rings for keyboard navigation.
- **ARIA Labels**: Descriptive labels for all interactive elements and icons.
- **Screen Reader Support**: Hidden helper text for complex terminal interactions.

---

## 🛠️ Setup & Development

1. **Clone the repository**:

   ```bash
   git clone [your-repo-link]
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ⚖️ Trade-offs & Considerations

- **Svelte 5 Adoption**: I chose Svelte 5 (Runes) despite it being the latest version to demonstrate mastery of the next generation of frontend reactivity. This required writing custom wrappers for some legacy libraries.
- **Native CSS vs Tailwind**: I opted for Native CSS to showcase "Engineering Mastery" over styling. This allowed for more complex custom animations (like the terminal pulse and glowing borders) that are often clunky to implement in utility-first frameworks.

---

**Built with ❤️ by Timilehin Akinsanmi — 2026**
