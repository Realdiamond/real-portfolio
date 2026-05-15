import { writable } from 'svelte/store';

export const activeSection = writable<string>('hero');
export const isMenuOpen = writable<boolean>(false);
export const isCommandPaletteOpen = writable<boolean>(false);
