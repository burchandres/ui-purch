<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import Switch from './ui/switch/switch.svelte';
	import { onMount } from 'svelte';

	let isDark = false;

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme(checked: boolean) {
		isDark = checked;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}
</script>

<div class="flex items-center space-x-2">
	<Sun class="h-4 w-4" />
	<Switch checked={isDark} onCheckedChange={toggleTheme} />
	<Moon class="h-4 w-4" />
</div>
