<script lang="ts">
	import { Card } from '../base/card';

	let {
		title,
		subtitle,
		class: className = '',
		children
	} = $props<{
		title: string;
		subtitle?: string;
		class?: string;
		children: unknown;
	}>();
</script>

<div class="container flex justify-center pt-16">
	<Card class="w-full max-w-md space-y-6 p-6 {className}">
		<div class="space-y-2 text-center">
			<h1 class="text-2xl font-bold">{title}</h1>
			{#if subtitle}
				<p class="text-muted-foreground text-sm">{subtitle}</p>
			{/if}
		</div>

		{@render children()}
	</Card>
</div>
