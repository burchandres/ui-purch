<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { ActionData } from './$types';

	let { form } = $props<{ form: ActionData }>();

	$effect(() => {
		if (form?.success) {
			goto('/dashboard');
		}
	});
</script>

<div class="container flex h-[calc(100vh-3.5rem)] items-center justify-center">
	<Card class="w-full max-w-md space-y-6 p-6">
		<div class="space-y-2 text-center">
			<h1 class="text-2xl font-bold">Welcome back</h1>
			<p class="text-muted-foreground text-sm">Enter your credentials to sign in</p>
		</div>

		<form method="post" action="?/login" use:enhance class="space-y-4">
			<div class="space-y-2">
				<label class="text-sm leading-none font-medium" for="username"> Username </label>
				<Input id="username" name="username" type="text" required />
			</div>

			<div class="space-y-2">
				<label class="text-sm leading-none font-medium" for="password"> Password </label>
				<Input id="password" name="password" type="password" required />
			</div>

			<div class="flex gap-4">
				<Button type="submit" class="flex-1">Login</Button>
				<Button type="submit" variant="outline" formAction="?/register" class="flex-1">
					Register
				</Button>
			</div>

			{#if form?.message}
				<p class="text-destructive text-sm">{form.message}</p>
			{/if}
		</form>
	</Card>
</div>
