<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/base/button/button.svelte';
	import { Input } from '$lib/components/base/input';
	import { FormCard } from '$lib/components/form-card';
	import type { ActionData } from './$types';

	let { form } = $props<{ form: ActionData }>();
	let formElement: HTMLFormElement;

	$effect(() => {
		if (form?.success) {
			formElement.reset();
		}
	});
</script>

<FormCard title="Login or Register">
	<form bind:this={formElement} method="post" action="?/login" use:enhance class="space-y-4">
		<div class="space-y-2">
			<label class="text-sm leading-none font-medium" for="username">Username</label>
			<Input id="username" name="username" type="text" required />
		</div>

		<div class="space-y-2">
			<label class="text-sm leading-none font-medium" for="password">Password</label>
			<Input id="password" name="password" type="password" required />
		</div>

		<div class="flex gap-4">
			<Button type="submit" class="flex-1">Login</Button>
			<Button type="submit" variant="outline" formAction="?/register" class="flex-1"
				>Register</Button
			>
		</div>

		{#if form?.message}
			<p class={'text-sm ' + form.success ? 'text-green-600' : 'text-destructive'}>
				{form.message}
			</p>
		{/if}
	</form>
</FormCard>
