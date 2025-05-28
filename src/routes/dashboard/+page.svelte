<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/base/button/button.svelte';
	import { FormCard } from '$lib/components/form-card';
	import { Table, TableBody, TableCell, TableRow } from '$lib/components/base/table';

	let { data } = $props<{ data: PageData }>();
	let timeRemaining = $state(`${getTimeString(data.purchToken.expiration - Date.now())}`);
	let logoutForm: HTMLFormElement;

	function getTimeString(remaining: number): string {
		return `${Math.floor(remaining / 60000)}m ${Math.floor((remaining % 60000) / 1000)}s`;
	}

	// update time remaining every second
	$effect(() => {
		const timer = setInterval(() => {
			const remaining = data.purchToken.expiration - Date.now();
			if (remaining <= 0) {
				timeRemaining = 'Expired';
				// force a reload
				logoutForm?.submit();
			} else timeRemaining = getTimeString(remaining);
		}, 1000);

		return () => clearInterval(timer);
	});
</script>

<FormCard title="Current Session">
	<div class="rounded-md border">
		<Table>
			<TableBody>
				<TableRow>
					<TableCell class="font-medium">Access token</TableCell>
					<TableCell class="font-mono break-all">{data.purchToken.token}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell class="font-medium">Time remaining</TableCell>
					<TableCell class="font-mono break-all">{timeRemaining}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>

	<form bind:this={logoutForm} method="POST" action="?/logout">
		<Button type="submit" class="float-right">Logout</Button>
	</form>
</FormCard>
