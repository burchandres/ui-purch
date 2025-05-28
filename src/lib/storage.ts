export type ThemeMode = 'auto' | 'light' | 'dark';

const THEME_KEY = 'theme-mode';

export const themeStorage = {
	get: (): ThemeMode => {
		return (localStorage.getItem(THEME_KEY) as ThemeMode) || 'auto';
	},

	set: (mode: ThemeMode) => {
		localStorage.setItem(THEME_KEY, mode);
	}
};
