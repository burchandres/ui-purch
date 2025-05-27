<script lang="ts">
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen">
	<header class="border-b">
		<div class="container flex h-14 items-center justify-between">
			<a href="/" class="font-bold">Pirch</a>
			<ThemeToggle />
		</div>
	</header>
	<main>
		{@render children()}
	</main>
</div>
