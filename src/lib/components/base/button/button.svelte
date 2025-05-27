<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import { buttonVariants, type ButtonVariants } from './index.js';

	type $$Props = HTMLButtonAttributes & ButtonVariants;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export { className as class };
</script>

<button
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
>
	<slot />
</button>
