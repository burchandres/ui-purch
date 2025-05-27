<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen">
	<header class="border-b bg-white">
		<div class="container flex h-14 items-center">
			<a
				href="/"
				class="hover:text-primary flex items-center gap-2 pl-4 text-lg font-semibold transition-colors"
			>
				<div class="h-4 w-4 rounded-full bg-black"></div>
				<span>Purch</span>
			</a>
		</div>
	</header>
	<main>
		{@render children()}
	</main>
</div>
